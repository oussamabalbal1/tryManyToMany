import { Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('book')
  NewBook(){
    return this.appService.createNewBookWithAuthors();
  }
  @Post('author')
  NewAuthor(){
    return this.appService.createNewAuthorWithBooks();
  }
  @Post('add-author')
  addingAuthortoBook(){
    return this.appService.addingAuthortoBook();
  }
  @Post('add-book')
  addingBootktoAuthor(){
    return this.appService.addingBootktoAuthor();
  }
  @Get('books')
  getBooks(){
    return this.appService.getBooks()
  }
  @Get('authors')
  getAuthors(){
    return this.appService.getAuthors()
  }
}
