import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { logger } from './common/middleware/logger.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptor/loggin.interceptor';

@Module({
  imports: [CatsModule],
  //Há varios tipos de providers que podem ser aplicados globalmente
  //Ex. Pipes, Guards, Interceptors, Exceptions
  //Da forma abaixo:
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: LoggingInterceptor,
  //   },
  // ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      // .exclude(
      //   { path: 'cats', method: RequestMethod.GET },
      //   { path: 'cats', method: RequestMethod.POST },
      //   'cats/(.*)',
      // )
      .forRoutes(CatsController);
    //.forRoutes({ path: 'cats', method: RequestMethod.GET });
    //forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
  }
}
