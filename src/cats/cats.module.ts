import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService]//EXPORTA A CATSSERVICE PARA COMPARTILHAR A MESMA INSTANCIA EM OUTRAS MODULES
})
export class CatsModule { }
