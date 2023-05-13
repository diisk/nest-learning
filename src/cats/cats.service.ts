import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { truncate } from 'fs/promises';
import { Cat } from './interfaces/cat.interface';

@Injectable({scope:Scope.REQUEST, durable:true})
export class CatsService {
  private readonly cats: Cat[] = [];


  constructor(@Inject(REQUEST) private request:Request){}

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id:number){
    return `retornando cat id:${id}`;
  }
}


//Provider opcional e customizado

// @Injectable()
// export class HttpService<T> {
//   constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
// }

//OUTRO CASO SEM USAR CONSTRUTOR

// @Injectable()
// export class HttpService<T> {
//   @Inject('HTTP_OPTIONS')
//   private readonly httpClient: T;
// }