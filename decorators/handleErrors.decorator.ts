import { applyDecorators, Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';

// Custom decorators
export function HandleErrors() {
  return applyDecorators(Catch(), (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        } else {
          throw new HttpException({ message: 'Internal server error', stack: error }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    };
  });
}
