import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: string;
  
  @Column()
  name: string;

  @ManyToMany(() => Book,(book) => book.authors)
  books: Book[]
}
