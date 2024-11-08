import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '8000', 10),
  API_URL: process.env.API_URL as string,
}));
