import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ExampleJob {
  private readonly logger = new Logger(ExampleJob.name);

  @Cron(CronExpression.EVERY_10_MINUTES)
  handleCron() {
    this.logger.debug('Called every 10 min');
    // your cron job logic here
  }
}
