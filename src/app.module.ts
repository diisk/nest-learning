import { Injectable, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { logger } from './common/middleware/logger.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptor/loggin.interceptor';
import DevelopmentConfigService from './common/service/development-config.service';
import ProductionConfigService from './common/service/production-config.service';
import ConfigService from './common/service/config.service';

//Esse objeto configura que, todo lugar que injetar o provide ConfigService (importar eu acho)
//vai substituir a classe ConfigService pela classe filho de acordo com a condição
//que no caso verifica se o ambiente é de desenvolvimento. 
const configServiceProvider = {
  provide: ConfigService,
  useClass:
    process.env.NODE_ENV === 'development'
      ? DevelopmentConfigService
      : ProductionConfigService,
};

//MESMA COISA QUE O DE CIMA, MAS COM ARRAYS
const configFactory = {
  provide: 'CONFIG',
  useFactory: () => {
    return process.env.NODE_ENV === 'development' ? [/* UM ARRAY DE CONFIG DE DEV */] : [/* UM ARRAY DE CONFIG DE PROD */];
  },
};

@Injectable()
class LoggerService {
  //CLASSE DE EXEMPLO
}

//USA UM PROVIDER JÁ EXISTENTE
const loggerAliasProvider = {
  provide: 'AliasedLoggerService',
  useExisting: LoggerService,
};

@Module({
  imports: [CatsModule],
  providers: [configServiceProvider, LoggerService, loggerAliasProvider],
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
