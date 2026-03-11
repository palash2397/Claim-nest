import { Injectable } from '@nestjs/common';
import { GraphService } from '../services/graph.service';


@Injectable()
export class CalenderService {
  constructor(private readonly graphService: GraphService) {}

  async getEvents(userId: string) {
    return this.graphService.graphRequest(
      userId,
      'GET',
      '/me/events?$select=subject,organizer,start,end,location',
    );
  }
}
