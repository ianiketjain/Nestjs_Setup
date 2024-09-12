import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { ExampleJob } from './jobs/example.job';
import { CronController } from './cron.controller';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CronService, ExampleJob], // Provide the jobs and service
  controllers: [CronController], // Register the controller
})
export class CronModule {}
