import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { awsConfig } from '@configs/configs.constants';

@Injectable()
export class UploadService {
  private s3;

  constructor() {
    this.s3 = new S3Client({
      region: awsConfig.awsRegion,
      credentials: {
        accessKeyId: awsConfig.awsAccessKey,
        secretAccessKey: awsConfig.awsSecretkey,
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `${uuid()}-${file.originalname}`;
    const uploadResult = await this.s3.send(
      new PutObjectCommand({
        Bucket: awsConfig.awsBucketName,
        Body: file.buffer,
        Key: key,
      }),
    );
    return `https://${awsConfig.awsBucketName}.s3.${awsConfig.awsRegion}.amazonaws.com/${key}`;
  }
}
