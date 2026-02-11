import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as mime from 'mime-types';


// aws setup
@Injectable()
export class AwsService {
  private s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  async uploadFile(key: string, buffer: Buffer, mimeType: string) {
    return this.s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      })
      .promise();
  }


  async getSignedFileUrl(key: string, expiresIn = 3600) {
    const contentType =
      mime.lookup(key) || 'application/octet-stream';

    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Expires: expiresIn,
      ResponseContentDisposition: 'inline',
      ResponseContentType: contentType,
    });
  }
}
