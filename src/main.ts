import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AggregateByTenantContextIdStrategy } from './common/class/aggregate-by-tenant';
import { LoggingInterceptor } from './common/interceptor/loggin.interceptor';
import { ValidationPipe } from './common/pipe/validation.pipe';

ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());//Não sei se isso vai funcionar aqui

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //Aplica a global em todos os handles
  //app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalGuards(new RolesGuard());
  //app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
