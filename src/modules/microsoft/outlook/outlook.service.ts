import { Injectable } from '@nestjs/common';
import { GraphService } from '../services/graph.service';

@Injectable()
export class OutlookService {
  constructor(private readonly graphService: GraphService) {}

  async getEmails(userId: string, pageToken?: string) {
    const endpoint = pageToken
      ? pageToken.replace('https://graph.microsoft.com/v1.0', '')
      : '/me/messages?$top=25&$orderby=receivedDateTime desc&$select=subject,from,receivedDateTime,bodyPreview,isRead,hasAttachments';

    const result = await this.graphService.graphRequest(
      userId,
      'GET',
      endpoint,
    );

    return {
      emails: result.value,
      nextPageToken: result['@odata.nextLink'] ?? null,
    };
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
