import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as mime from 'mime-types';

// aws setup
@Injectable()
export class AwsService {
  private s3 = new S3({
    region: process.env.AWS_REGION, // credentials automatically picked from EC2 role
  });

  async uploadFile(key: string, buffer: Buffer, mimeType: string) {
    try {
      return this.s3
        .upload({
          Bucket: process.env.AWS_S3_BUCKET!,
          Key: key,
          Body: buffer,
          ContentType: mimeType,
        })
        .promise();
    } catch (error) {
      console.log(`Error uploading file: ${error}`);
      throw error;
    }
  }

  async deleteFile(key: string) {
    try {
      return await this.s3
        .deleteObject({
          Bucket: process.env.AWS_S3_BUCKET!,
          Key: key,
        })
        .promise();
    } catch (error) {
      console.log(`Error deleting file: ${error}`);
      throw error;
    }
  }

  async getSignedFileUrl(key: string, expiresIn = 3600) {
    const contentType = mime.lookup(key) || 'application/octet-stream';

    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Expires: expiresIn,
      ResponseContentDisposition: 'inline',
      ResponseContentType: contentType,
    });
  }
}
