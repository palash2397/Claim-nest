import { Injectable } from '@nestjs/common';
import { GraphService } from '../services/graph.service';

@Injectable()
export class OnedriveService {
  constructor(private readonly graphService: GraphService) {}

  async listFiles(userId: string) {
    return this.graphService.graphRequest(
      userId,
      'GET',
      '/me/drive/root/children',
    );
  }

  async uploadFile(
    userId: string,
    fileName: string,
    fileBuffer: Buffer,
  ) {
    return this.graphService.graphRequest(
      userId,
      'PUT',
      `/me/drive/root:/${fileName}:/content`,
      fileBuffer,
    );
  }
}
