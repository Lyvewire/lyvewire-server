import * as bcrypt from "bcryptjs";
import { IsEmail, IsISO8601, IsNotEmpty } from "class-validator";
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { UserForm } from "./forms/user";

const SALT_ROUNDS = 10;

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column({ select: false })
    secret: string;

    @Column("date")
    @IsISO8601()
    @IsNotEmpty()
    birthDate: string;

    @Column()
    @Index({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    //
    // ─── Functions ───────────────────────────────────────────────────────────────────────────
    //

    comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.secret);
    }

    static findByEmail(email: string): Promise<User | undefined> {
        return this.findOne({
            select: ["id", "name", "secret", "email"],
            where: { email },
        });
    }

    static createFromForm(form: UserForm): Promise<User> {
        return new Promise((resolve, reject) =>
            bcrypt.hash(form.password, SALT_ROUNDS, (err, hash) => {
                if (err) {
                    reject(err);
                    return;
                }

                const user = User.create({
                    name: form.name,
                    email: form.email,
                    secret: hash,
                    birthDate: form.birthDate,
                });

                resolve(user);
            }),
        );
    }
}
