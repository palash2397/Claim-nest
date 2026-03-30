import { Injectable } from '@nestjs/common';
import { GraphService } from '../services/graph.service';
import { ApiResponse } from 'src/utils/helper/ApiResponse';
import { Msg } from 'src/utils/helper/responseMsg';

@Injectable()
export class OutlookService {
  constructor(private readonly graphService: GraphService) {}

  async getEmails(userId: string, pageToken?: string) {
    try {
      const endpoint = pageToken
        ? pageToken.replace('https://graph.microsoft.com/v1.0', '')
        : '/me/messages?$top=25&$orderby=receivedDateTime desc&$select=subject,from,receivedDateTime,bodyPreview,isRead,hasAttachments';

      const result = await this.graphService.graphRequest(
        userId,
        'GET',
        endpoint,
      );

      const data = {
        emails: result.value,
        nextPageToken: result['@odata.nextLink'] ?? null,
      };

      return new ApiResponse(200, data, Msg.OUTLOOK_EMAILS_FETCHED_SUCCESS);
    } catch (error) {
      console.log(`error who called getEmails:`, error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async sendEmail(
    userId: string,
    to: string,
    subject: string,
    content: string,
  ) {
    try {
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
        saveToSentItems: true, // ✅ saves to Sent folder
      };

      await this.graphService.graphRequest(
        userId,
        'POST',
        '/me/sendMail',
        payload,
      );

      return new ApiResponse(200, {}, Msg.OUTLOOK_EMAIL_SENT_SUCCESS);
    } catch (error) {
      console.log(`error who called sendEmail:`, error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async getEmailById(userId: string, emailId: string) {
    try {
      const result = await this.graphService.graphRequest(
        userId,
        'GET',
        `/me/messages/${emailId}?$select=subject,from,toRecipients,ccRecipients,body,receivedDateTime,isRead,hasAttachments`,
      );

      const data = {
        id: result.id,
        subject: result.subject,
        from: result.from,
        to: result.toRecipients,
        cc: result.ccRecipients,
        body: result.body, // { contentType: 'html'/'text', content: '...' }
        receivedDateTime: result.receivedDateTime,
        isRead: result.isRead,
        hasAttachments: result.hasAttachments,
      };
      return new ApiResponse(200, data, Msg.OUTLOOK_EMAIL_FETCHED_SUCCESS);
    } catch (error) {
      console.log(`error who called getEmailById:`, error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async getEmailsByFolder(userId: string, folder: string, pageToken?: string) {
    try {
      const endpoint = pageToken
        ? pageToken.replace('https://graph.microsoft.com/v1.0', '')
        : `/me/mailFolders/${folder}/messages?$top=25&$orderby=receivedDateTime desc&$select=subject,from,toRecipients,receivedDateTime,bodyPreview,isRead,hasAttachments`;

      const result = await this.graphService.graphRequest(
        userId,
        'GET',
        endpoint,
      );

      const data = {
        emails: result.value,
        nextPageToken: result['@odata.nextLink'] ?? null,
      };

      return new ApiResponse(200, data, Msg.OUTLOOK_EMAILS_FETCHED_SUCCESS);
    } catch (error) {
      console.log(`error while fetching emails:`, error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async deleteEmail(userId: string, emailId: string) {
    await this.graphService.graphRequest(
      userId,
      'DELETE',
      `/me/messages/${emailId}`,
    );
    return new ApiResponse(200, {}, Msg.OUTLOOK_EMAIL_DELETED);
  }

  async replyEmail(userId: string, emailId: string, comment: string) {
    await this.graphService.graphRequest(
      userId,
      'POST',
      `/me/messages/${emailId}/reply`,
      { comment },
    );
    return new ApiResponse(200, {}, Msg.SUCCESS);
  }
}
