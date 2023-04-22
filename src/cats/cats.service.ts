import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
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