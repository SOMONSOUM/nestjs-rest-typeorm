import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from '../login/dto/login.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { AuthType } from 'src/common/enums/auth-type.enum';
import {
  ApiLoginBody,
  ApiLoginResponseOk,
  ApiRefreshTokenBody,
  ApiRefreshTokenResponseOk,
} from './login.swagger';

@ApiTags('auth')
@AuthGuard(AuthType.None)
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ApiLoginBody })
  @ApiResponse({
    status: 200,
    description: 'Logged in successfully',
    type: ApiLoginResponseOk,
  })
  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.loginService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ApiRefreshTokenBody })
  @ApiResponse({
    status: 200,
    description: 'Created successfully',
    type: ApiRefreshTokenResponseOk,
  })
  @Post('refresh-tokens')
  public async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.loginService.refreshTokens(refreshTokenDto);
  }
}
