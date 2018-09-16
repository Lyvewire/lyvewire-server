import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate } from 'class-validator';

@Entity()
export class Stream {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    title: string;

    @Column('date')
    @IsDate()
    startStream: Date;

    @Column()
    description: string;

    @Column()
    views: number;
}