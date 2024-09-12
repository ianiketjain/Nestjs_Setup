import { Injectable } from '@nestjs/common';
import { ExampleJob } from './jobs/example.job';

@Injectable()
export class CronService {
  constructor(private readonly exampleJob: ExampleJob) {}
}
