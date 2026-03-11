import { Injectable } from '@nestjs/common';
import { GraphService } from '../services/graph.service';

import { Msg } from 'src/utils/helper/responseMsg';
import { ApiResponse } from 'src/utils/helper/ApiResponse';

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

  async createEvent(
    userId: string,
    payload: {
      subject: string;
      content: string;
      start: string;
      end: string;
      attendees: string[];
    },
  ) {
    const event = {
      subject: payload.subject,
      body: {
        contentType: 'HTML',
        content: payload.content,
      },
      start: {
        dateTime: payload.start,
        timeZone: 'UTC',
      },
      end: {
        dateTime: payload.end,
        timeZone: 'UTC',
      },
      attendees: payload.attendees.map((email) => ({
        emailAddress: {
          address: email,
        },
        type: 'required',
      })),
    };

    return this.graphService.graphRequest(userId, 'POST', '/me/events', event);
  }
}
