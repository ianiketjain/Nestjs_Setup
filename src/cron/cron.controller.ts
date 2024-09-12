// This file is to trigger the cron jobs manuelly

import { Controller, Post } from '@nestjs/common';
import { ExampleJob } from './jobs/example.job';

@Controller('cron')
export class CronController {
  constructor(private readonly exampleJob: ExampleJob) {}

  @Post('triggerjob')
  triggerExampleJob() {
    // this.exampleJob.executeJob();
    return 'Example job triggered!';
  }
}
