import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigRootModule } from 'src/config/index.module';
import { IndexModule } from './modules/index.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt_auth.guard';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [ConfigRootModule, AuthModule, IndexModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
