// This is consider as model in Expressjs . help to create a table in db
import { isEmpty, IsIP, Matches } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, AfterInsert } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: '' })
  @Matches(/^\d{10}$/, { message: 'Mobile number must be exactly 10 digits' })
  mobile: string;

  @Column({ default: '' })
  access_token: string;

  @Column()
  @Matches(/^[a-zA-Z0-9 ]*$/, { message: 'Username must not contain special characters' })
  username: string;

  @Column({ default: '' })
  @Matches(/^\d{6}$/, { message: 'OTP must be exactly 6 digits' })
  otp: string;

  @Column({ default: '' })
  otp_expiration_time: string;

  @Column({ default: 0 })
  otp_attempts: number;

  @Column({ nullable: true })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;
}
