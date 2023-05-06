import { Injectable, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { logger } from './common/middleware/logger.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptor/loggin.interceptor';
import { ConfigModule } from './config/config.module';
import { HelloService } from './hello/hello.service';
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

@Injectable()
export class AppService {
  constructor(private helloService: HelloService) {}

  getRoot(): string {
    this.helloService.sayHello('My name is getRoot');

    return 'Hello world!';
  }
}

//USA UM PROVIDER JÁ EXISTENTE
const loggerAliasProvider = {
  provide: 'AliasedLoggerService',
  useExisting: LoggerService,
};

@Module({
  imports: [
    CatsModule,

    //PRIMEIRO CASO, MAIS SIMPLES, ONDE O CONSTRUTOR DO SERVICE INJETA 'CONFIG_OPTIONS'
    //E O METODO REGISTER FOI CRIADO NO CÓDIGO
    // ConfigModule.register({ folder: './config' })
    
    //SEGUNDO CASO,ONDE A MODULE SE EXTEMDE DA CLASSE ConfigurableModuleClass
    //E TANTO O METODO register QUANDO registerAsync é herdado
    // ConfigModule.registerAsync({
    //   useFactory: () => {
    //     return {
    //       folder: './config',
    //     }
    //   },
    //   inject: []
    // }),
    

    //TERCEIRO CASO, ONDE ACONTECE O MESMO DO SEGUNDO CASO
    //PORÉM É ALTERADO O CLASSNAME DO METODO PARA 'forRoot'
    //PARECE QUE ESSE CLASSNAME PODE SER ALTERADO PARA QUALQUER NOME

    /**
     * OBS:
     * 
     * 
     * register, you are expecting to configure a dynamic module with a specific configuration
     * for use only by the calling module. For example, with Nest's @nestjs/axios:
     * HttpModule.register({ baseUrl: 'someUrl' }). If, in another module you use
     * HttpModule.register({ baseUrl: 'somewhere else' }), it will have the different
     * configuration. You can do this for as many modules as you want.

     * forRoot, you are expecting to configure a dynamic module once and reuse that configuration
     * in multiple places (though possibly unknowingly as it's abstracted away).
     * This is why you have one GraphQLModule.forRoot(), one TypeOrmModule.forRoot(), etc.

     * forFeature, you are expecting to use the configuration of a dynamic module's forRoot but need to
     * modify some configuration specific to the calling module's needs
     * (i.e. which repository this module should have access to, or the context that a logger should use.)
     * 
     * 
     */

    //ConfigModule.forRoot({ folder: './config' }),
    //OU
    // ConfigModule.forRootAsync({
    //   useFactory: () => {
    //     return {
              //EXTRA ADICIONADO NO QUINTO CASO:
              //isGlobal: true,
    //       folder: './config',
    //     }
    //   },
    //   inject: []
    // }),

    //QUARTO CASO: ONDE A CLASSE PASSADA NO OBJETO PRECISA TER O METODO DEFINIDO
    //NA CLASSE EXTENDIDA(ConfigurableModuleClass), CASO NÃO TENHA SIDO DEFINIDA O PADRÃO É create
    // ConfigModule.registerAsync({
    //   useClass: ConfigModuleOptionsFactory,
    // }),
  ],
  providers: [configServiceProvider, LoggerService, loggerAliasProvider, HelloService],
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
