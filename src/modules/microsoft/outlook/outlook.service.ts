import { Injectable } from '@nestjs/common';
import { GraphService } from '../services/graph.service';

@Injectable()
export class OutlookService {
  constructor(private readonly graphService: GraphService) {}

  async getEmails(userId: string) {
    return this.graphService.graphRequest(
      userId,
      'GET',
      '/me/messages?$top=25&$select=subject,from,receivedDateTime,bodyPreview',
    );
  }

  async sendEmail(
    userId: string,
    to: string,
    subject: string,
    content: string,
  ) {
    const payload = {
      message: {
        subject,
        body: {
          contentType: 'HTML',
          content,
        },
        toRecipients: [
          {
            emailAddress: {
              address: to,
            },
          },
        ],
      },
    };

    return this.graphService.graphRequest(
      userId,
      'POST',
      '/me/sendMail',
      payload,
    );
  }
}
