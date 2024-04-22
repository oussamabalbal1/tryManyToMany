import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './Entities/book.entity';
import { Repository } from 'typeorm';
import { Author } from './Entities/author.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
  ) {}
  async createNewBookWithAuthors():Promise<Book>{
    //creating three authors and save them in database
    const author1 = await this.authorRepository.create({name:"AUTHOR1"})
    const newAuthor1 = await this.authorRepository.save(author1)

    const author2 = await this.authorRepository.create({name:"AUTHOR2"})
    const newAuthor2 = await this.authorRepository.save(author2)

    const author3 = await this.authorRepository.create({name:"AUTHOR3"})
    const newAuthor3 = await this.authorRepository.save(author3)

    //creating one book and add three authors to it
    const newBook = await this.bookRepository.create({description:"This is my first book",name:"First book",authors:[newAuthor1,newAuthor2,newAuthor3]})

    //save the book in database
    return this.bookRepository.save(newBook)
  }


  async createNewAuthorWithBooks():Promise<Author>{
    //creating three books and save them in database
    const book1 = await this.bookRepository.create({name:"BOOK1",description:"This is a book"})
    const newBook1 = await this.bookRepository.save(book1)

    const book2 = await this.bookRepository.create({name:"BOOK2",description:"This is a book"})
    const newBook2 = await this.bookRepository.save(book2)

    const book3 = await this.bookRepository.create({name:"BOOK3",description:"This is a book"})
    const newBook3 = await this.bookRepository.save(book3)

    //creating one author and add three books to it
    const newAuthor = await this.authorRepository.create({name:"This is my first author",books:[newBook1,newBook2,newBook3]})

    //save the author in database
    return this.authorRepository.save(newAuthor)

  }


  async getBooks():Promise<Book[]>{
    return await this.bookRepository.find({
      relations:{authors:true}
    })
  }
  async getAuthors():Promise<Author[]>{
    return await this.authorRepository.find({
      relations:{books:true}
    })
  }

  //adding an existing author to a book
  async addingAuthortoBook(){
    //find that book which we want to add the author
    const bookId='1'
    const book = await this.bookRepository.findOne({relations: {
      authors: true,
    },
    where: {
      id: bookId,
    },
  })
  //find the auther
  const authorId='4'
  const author =await this.authorRepository.findOneBy({id:authorId})

  //adding the author to that book
  //we have to make sure there is no author with same id
  const isThere = book.authors.find((author) => author.id == authorId);
  if(isThere){
    throw new HttpException(`Author Already Exist`,HttpStatus.NOT_ACCEPTABLE)
  }
  //adding
  book.authors.push(author)
  //save it into database
  return this.bookRepository.save(book)
  }

  //adding an existing book to a author
  async addingBootktoAuthor(){
    //find that book which we want to add the author
    const bookId='1'
    const book = await this.bookRepository.findOne({relations: {
      authors: true,
    },
    where: {
      id: bookId,
    },
  })
  //find the auther
  const authorId='2'
  const author =await this.authorRepository.findOneBy({id:authorId})

  //adding the book to that author
  //we have to make sure there is no book with same id
  const isThere = author.books.find((book) => book.id == bookId);
  if(isThere){
    throw new HttpException(`Book Already Exist`,HttpStatus.NOT_ACCEPTABLE)
  }
  //adding
  author.books.push(book)
  //save it into database
  return this.bookRepository.save(book)
  }

}
