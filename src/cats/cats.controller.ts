import { Body, Controller, Get, HttpCode, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

export class CreateCatDto {
    name: string;
    age: number;
    breed: string;
}


// //@Controller({ host: ':account.example.com' }) LIMITA A CONTROLLER PARA SER USADA APENAS NO HOST ESPECIFICO
// export class AccountController {
//   @Get()
//   getInfo(@HostParam('account') account: string) {
//     return account;
//   }
// }

@Controller('cats')
export class CatsController {
    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        return 'This action adds a new cat';
    }

    //A ORDEM DOS DECORATORS IMPORTA, ESSE PRIMEIRO GET TEM PRIORIDADE EM RELACAO AO SEGUNDO

    @Get('a(cd)?b')//(Essa rota pega /ab e /acdb) Pode se usar expressões regulares como ?,+,* e ()...
    findAll(@Res() response: Response, @Req() request: Request) {//Response e request são da library que estiver utilizando (ex. Express/Fastify)
        response.status(200).send("Teste");
        //response.status(HttpStatus.OK).json([]);
    }

    //passthrough utiliza a library e o proprio padrão do nest, mas estudar direito pois pode haver ter mais coisas
    // @Get()
    // findAll(@Res({ passthrough: true }) res: Response) {
    //     res.status(HttpStatus.OK);
    //     return [];
    // }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `This action returns a #${id} cat`;
    }
    // @Get(':id')
    // findOne(@Param() params: any): string {
    //     console.log(params.id);
    //     return `This action returns a #${params.id} cat`;
    // }

    @Get()
    findAllTest(@Query() query: any) {
        return `This action returns all cats (limit: ${query.limit} items)`;
    }
}
