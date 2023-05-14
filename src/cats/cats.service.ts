import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { truncate } from 'fs/promises';

@Injectable({scope:Scope.REQUEST, durable:true})
export class CatsService {
  private readonly cats: string[] = [];


  constructor(){}

  create(cat:string) {
    this.cats.push(cat);
  }

  findAll(): string[] {
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