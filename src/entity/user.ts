import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsDate } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column('date')
    @IsDate()
    birthDate: Date;

    @Column()
    secret: string;
}