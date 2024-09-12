import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'Abcd@123',
      database: 'gamedev',
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User]),
    CronModule,
    UserModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
