import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class ApiUserResponseOk {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({
    type: String,
  })
  email: string;
}

export class ApiLoginResponseOk {
  @ApiProperty({ description: 'Access token for authentication', type: String })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token for authentication',
    type: String,
  })
  refreshToken: string;

  @ApiProperty({ description: 'User', type: PickType(User, ['id', 'email']) })
  user: ApiUserResponseOk;
}

export class ApiLoginBody {
  @ApiProperty({ type: String, example: 'sok.dara@moc.gov.kh' })
  email: string;

  @ApiProperty({ type: String, minLength: 6, example: 'Moc@168' })
  password: string;
}

export class ApiRefreshTokenBody {
  @ApiProperty({
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  refreshToken: string;
}

export class ApiRefreshTokenResponseOk {
  @ApiProperty({ description: 'Access token for authentication', type: String })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token for authentication',
    type: String,
  })
  refreshToken: string;

  @ApiProperty({ description: 'User', type: PickType(User, ['id', 'email']) })
  user: User;
}
