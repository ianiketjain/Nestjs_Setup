import { Controller, Get, Post, Body, Req, Res, HttpStatus, Param } from '@nestjs/common';
import { AccountService } from './account.service';
import { Request, Response } from 'express';
import { CreateAccountDto, ForgetPasswordDto, LoginDto } from './dto/account.dto';

@Controller('auth')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('login')
  async login(@Body() Body: LoginDto) {
    return this.accountService.login(Body);
  }

  @Post('register')
  async registerPage(@Body() Body: CreateAccountDto, @Req() Req: Request) {
    return this.accountService.registerUser(Body, Req);
  }

  @Post('forgotpassword')
  async forgotPasswordPage(@Body() Body: ForgetPasswordDto) {
    return this.accountService.forgetPassword(Body);
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    return this.accountService.logout(Req);
  }
}
