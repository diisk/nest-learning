import { Body, Controller, DefaultValuePipe, Get, HttpStatus, Param, ParseIntPipe, Post, Req, Res, Scope, SetMetadata, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { Response, Request } from 'express';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { AlternativeValidationPipe, ZodValidationPipe } from '../common/pipe/validation.pipe';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { LoggingInterceptor } from '../common/interceptor/loggin.interceptor';
import { User } from '../common/decorator/user.decorator';
import { Auth } from '../common/decorator/auth.decorator';


// //@Controller({ host: ':account.example.com' }) LIMITA A CONTROLLER PARA SER USADA APENAS NO HOST ESPECIFICO
// export class AccountController {
//   @Get()
//   getInfo(@HostParam('account') account: string) {
//     return account;
//   }
// }

//@Controller('cats')
@Controller({
    path:'cats',
    scope:Scope.REQUEST
})
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
    constructor(private catsService: CatsService) { }


    @Post()
    @Auth('admin')
    async create(@Body(new AlternativeValidationPipe()) createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    // @Post()
    // @Roles('admin')
    // //@SetMetadata('roles', ['admin']) //Outra forma de setar roles, mas foi feito um decorator customizado pra isso
    // async create(@Body(new AlternativeValidationPipe()) createCatDto: CreateCatDto) {
    //     this.catsService.create(createCatDto);
    // }

    // @Post()
    // @UsePipes(new ZodValidationPipe(createCatSchema))
    // async create(@Body() createCatDto: CreateCatDto) {
    //     this.catsService.create(createCatDto);
    // }

    // @Post()
    // async create(@Body() createCatDto: CreateCatDto) {
    //     this.catsService.create(createCatDto);
    // }

    //A ORDEM DOS DECORATORS IMPORTA, ESSE PRIMEIRO GET TEM PRIORIDADE EM RELACAO AO SEGUNDO

    @Get('a(cd)?b')//(Essa rota pega /ab e /acdb) Pode se usar expressões regulares como ?,+,* e ()...
    findAllTst(@Res() response: Response, @Req() request: Request) {//Response e request são da library que estiver utilizando (ex. Express/Fastify)
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
    async findOne(@User('Ohoi') user: unknown) {
        return {user};
    }



    // @Get(':id')
    // async findOne(
    //     @Param('id', new DefaultValuePipe(-1), new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    //     id: number,
    // ) {
    //     return this.catsService.findOne(id);
    // }


    // @Get(':id')
    // async findOne(
    //     @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    //     id: number,
    // ) {
    //     return this.catsService.findOne(id);
    // }

    // @Get(':id')
    // findOne(@Param('id', ParseIntPipe) id: number): string {//PIPE É UM TRANSFORMADOR E VALIDADOR, SE O DADO ENÃO FOR VALIDO ELE LANÇA UMA EXCEPTION
    //     return `This action returns a #${id} cat`;
    // }
    // @Get(':id')
    // findOne(@Param() params: any): string {
    //     console.log(params.id);
    //     return `This action returns a #${params.id} cat`;
    // }

    // @Get()
    // findAllTest(@Query() query: any) {
    //     return `This action returns all cats (limit: ${query.limit} items)`;
    // }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }
}
