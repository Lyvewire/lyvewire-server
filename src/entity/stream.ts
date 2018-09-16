import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stream {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    title: string;

    @Column()
    startStream: Date;

    @Column()
    description: string;

    @Column()
    views: number;
}