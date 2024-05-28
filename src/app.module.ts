import { TypeOrmConfig } from '@configs/database/typeorm.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormModule } from '@form/form.module';
import { RoleModule } from '@role/role.module';
import { UserFormModule } from '@user-form/user-form.module';
import { UserRoleModule } from '@user-role/user-role.module';
import { FormDetailModule } from '@form-detail/form-detail.module';
import { RoleModuleModule } from '@role-module/role-module.module';
import { UsersModule } from '@users/users.module';
import { EmailModule } from '@email/email.module';
import { AuthModule } from '@auth/auth.module';
import {
  AcceptLanguageResolver,
  QueryResolver,
  HeaderResolver,
  CookieResolver,
  I18nJsonLoader,
  I18nModule,
} from 'nestjs-i18n';
import { join } from 'path';
import { ReportModule } from '@report/report.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationModule } from '@notification/notification.module';
import { UploadModule } from '@upload/upload.module';
import { UserFormDetailModule } from '@user-form-detail/user-form-detail.module';

@Module({
  imports: [
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        new QueryResolver(['lang', 'l']),
        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot(TypeOrmConfig),
    FormModule,
    RoleModule,
    UserFormModule,
    UserRoleModule,
    FormDetailModule,
    RoleModuleModule,
    UsersModule,
    EmailModule,
    AuthModule,
    ReportModule,
    NotificationModule,
    UserFormDetailModule,
    UploadModule,
  ],
})
export class AppModule {
  //   configure(consumer: MiddlewareConsumer) {
  //     consumer.apply(LogsMiddleware).forRoutes('*');
  //   }
}
