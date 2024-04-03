import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { HashingService } from '../../shared/hashing/hashing.service';
import { BcryptService } from '../../shared/hashing/bcrypt.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from 'src/common/guards/authentication/authentication.guard';
import { AccessTokenGuard } from 'src/common/guards/access-token/access-token.guard';
import jwtConfig from 'src/common/config/jwt.config';
import { StudentService } from 'src/user/services/student.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { Student } from 'src/user/entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Student]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
    LoginService,
    StudentService,
    UserService,
  ],
  controllers: [LoginController],
})
export class LoginModule {}
