import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [LoginModule],
  providers: [JwtService],
})
export class AuthModule {}
