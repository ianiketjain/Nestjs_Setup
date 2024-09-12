import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateAccountDto {
  @Matches(/^\d{10}$/, { message: 'Mobile number must be exactly 10 digits' })
  mobile: number;

  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;

  @IsNotEmpty()
  invitecode: string;
}

export class ForgetPasswordDto {
  @MaxLength(10)
  mobile: number;

  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;

  @Matches(/^\d{6}$/, { message: 'OTP must be exactly 6 digits' })
  otp: string;
}

export class LoginDto {
  username: string;

  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;
}

export class ResendOtpDto {}
