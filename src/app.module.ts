import { Module } from '@nestjs/common';
import { RootModule } from '~/root/root.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [RootModule, UsersModule]
})
export class AppModule {}
