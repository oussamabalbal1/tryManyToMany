import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Author } from './author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  description: string;
  
  @Column()
  name: string;

  @ManyToMany(() => Author,(author) => author.books, {
    cascade: true,
})

@JoinTable({
    name: 'book_author', // Specify the name of the join table
    joinColumn: {
      name: 'book_id', // Specify the name of the column referencing Book entity
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'author_id', // Specify the name of the column referencing Author entity
      referencedColumnName: 'id'
    }
  })
  authors: Author[]
}
