import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OIDCStrategy } from 'passport-azure-ad';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(
  OIDCStrategy,
  'microsoft',
) {
  constructor() {
    super({
      identityMetadata: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/v2.0/.well-known/openid-configuration`,
      clientID: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
      responseType: 'code',
      responseMode: 'query',
      redirectUrl: process.env.MICROSOFT_CALLBACK_URL as string,
      allowHttpForRedirectUrl: false, // only for local dev
      passReqToCallback: true,
      scope: [
        'openid',
        'profile',
        'email',
        'offline_access',
        'User.Read',
        'Mail.ReadWrite',
        'Mail.Send',
        'Calendars.ReadWrite',
        'Files.ReadWrite',
      ],
    });
  }

  async validate(
    req: any, 
    iss: string,
    sub: string,
    profile: any,
    accessToken: string,
    refreshToken: string,
    done: Function,
  ) {

      console.log('SESSION IN VALIDATE:', req.session);

     console.log('✅ Microsoft profile:', profile);
    const user = {
      microsoftId: profile.oid,
      email: profile._json.preferred_username,
      name: profile.displayName,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
