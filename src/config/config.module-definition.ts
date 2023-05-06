import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ConfigModuleOptions } from './interfaces/config-module-options.interface';

// //SEGUNDO CASO:
// export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
//   new ConfigurableModuleBuilder<ConfigModuleOptions>()
  
//   //TERCEIRO CASO:
//   .setClassMethodName('forRoot')

//   //QUARTO CASO:
//   .setFactoryMethodName('createConfigOptions')

//   //QUINTO CASO(Propriedades extras não ficam disponiveis no objeto injetado.):
//   .setExtras(
//     {
//       isGlobal: true,
//     },
//     (definition, extras) => ({
//       ...definition,
//       global: extras.isGlobal,
//     }),
//   )
  
//   .build();

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<ConfigModuleOptions>().build();