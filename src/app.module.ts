import { Module } from '@nestjs/common';
import { AuthModule } from '~/auth/auth.module';
import { RootModule } from '~/root/root.module';
import { UsersModule } from '~/users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [RootModule, UsersModule, AuthModule, ProductsModule]
})
export class AppModule {}
