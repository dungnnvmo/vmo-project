import { config } from 'dotenv';
if (process.env.NODE_ENV === 'production') {
  config({ path: (process.cwd(), 'src/configs/env/production.env') });
} else {
  config({ path: (process.cwd(), 'src/configs/env/development.env') });
}
export const databaseConfig = {
  type: process.env.DB_TYPE,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: process.env.DB_SYNCHRONIZE,
};

export const appConfig = {
  port: process.env.APP_PORT,
  prefix: process.env.API_PREFIX,
  backendDomain: process.env.BACKEND_DOMAIN,
  name: process.env.APP_NAME,
};
export const googleConfig = {
  id: process.env.GOOGLE_ID,
  secret: process.env.GOOGLE_SECRET,
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
};

export const mailConfig = {
  emailService: process.env.EMAIL_SERVICE,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
  defaultEmail: process.env.DEFAULT_EMAIL,
  defaultName: process.env.DEFAULT_NAME,
};

export const awsConfig = {
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
  awsSecretkey: process.env.AWS_SECRET_ACCESS_KEY,
  awsRegion: process.env.AWS_REGION,
  awsBucketName: process.env.AWS_BUCKET_NAME,
};
