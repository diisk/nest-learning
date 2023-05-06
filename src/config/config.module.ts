// import { DynamicModule, Module } from '@nestjs/common';
// import { ConfigurableModuleClass } from './config.module-definition';
// import { ConfigService } from './config.service';

// @Module({
//   providers: [ConfigService],
//   exports: [ConfigService],
// })
// export class ConfigModule extends ConfigurableModuleClass {
//   static register(options: Record<string, any>): DynamicModule {
//     return {
//       module: ConfigModule,
//       providers: [
//         {
//           provide: 'CONFIG_OPTIONS',
//           useValue: options,
//         },
//         ConfigService,
//       ],
//       exports: [ConfigService],
//     };
//   }
// }


import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import {
  ConfigurableModuleClass,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} from './config.module-definition';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      // your custom logic here
      ...super.register(options),
    };
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      // your custom logic here
      ...super.registerAsync(options),
    };
  }
}