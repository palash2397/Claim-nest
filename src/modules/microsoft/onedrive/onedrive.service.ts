import { Injectable } from '@nestjs/common';
import { GraphService } from '../services/graph.service';

import axios from 'axios';

@Injectable()
export class OnedriveService {
  constructor(private readonly graphService: GraphService) {}

  async listFiles(userId: string) {
    const result = await this.graphService.graphRequest(
      userId,
      'GET',
      '/me/drive/root/children?$select=id,name,size,lastModifiedDateTime,file,folder,webUrl',
    );

    console.log(result);
    return {
      files: result.value,
    };
  }

  async uploadFile(userId: string, fileName: string, fileBuffer: Buffer) {
    const accessToken = await this.graphService.getAccessToken(userId); // ✅ get token directly

    const response = await axios.put(
      `https://graph.microsoft.com/v1.0/me/drive/root:/${fileName}:/content`,
      fileBuffer,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/octet-stream', // ✅ required for file upload
        },
      },
    );

    return {
      id: response.data.id,
      name: response.data.name,
      size: response.data.size,
      webUrl: response.data.webUrl,
      lastModifiedDateTime: response.data.lastModifiedDateTime,
    };
  }

  async deleteFile(userId: string, itemId: string) {
    return this.graphService.graphRequest(
      userId,
      'DELETE',
      `/me/drive/items/${itemId}`,
    );
  }
}
