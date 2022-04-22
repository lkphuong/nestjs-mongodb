import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigRootModule } from 'src/config/index.module';
import { IndexModule } from './modules/index.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt_auth.guard';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ConfirmUrl } from 'src/common/middlewares/confirm_url.middleware';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigRootModule,
    AuthModule,
    IndexModule,
    MailModule,
    SocketModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ConfirmUrl).forRoutes('user/resetPassword/*'); // custom url
  }
}
