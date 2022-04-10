import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from '~/auth/auth.module';
import { CacheService } from '~/config';
import { RootModule } from '~/root/root.module';
import { UsersModule } from '~/users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheService
    }),
    RootModule,
    UsersModule,
    AuthModule,
    ProductsModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ]
})
export class AppModule {}
