import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './Entities/book.entity';
import { Author } from './Entities/author.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'oussama',
    database: 'manyToMany',
    autoLoadEntities:true,
    //when the app start will do sync with db, used only on dev stage
    synchronize: true,
}),
TypeOrmModule.forFeature([Book,Author])],
    
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
