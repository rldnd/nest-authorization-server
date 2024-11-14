import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '8000', 10),
  API_URL: process.env.API_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as string,
  JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string,
  SALT_ROUND: parseInt(process.env.SALT_ROUND || '10', 10),
}));
