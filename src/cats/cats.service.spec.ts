import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;
  let controller: CatsController;

  //Usa o MockFactory pra aplicar em todas as dependecias faltando.
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
    })
    .useMocker((token) => {
      const results = ['test1', 'test2'];
      if (token === CatsService) {
        return { findAll: jest.fn().mockResolvedValue(results) };
      }
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
    .compile();
    
    controller = moduleRef.get(CatsController);
  });

  //Cria uma module de teste com um contexto.
  // beforeEach(async () => {
  //   const moduleRef = await Test.createTestingModule({
  //       controllers: [CatsController],
  //       providers: [CatsService],
  //     }).compile();

  //   catsService = moduleRef.get<CatsService>(CatsService);
  //   catsController = moduleRef.get<CatsController>(CatsController);
  // });

  //Forma mais simples
  // beforeEach(() => {
  //   catsService = new CatsService();
  //   catsController = new CatsController(catsService);
  // });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

      expect(await catsController.findAll()).toBe(result);
    });
  });
});