import { OAuthConfig, OAuthUserConfig } from 'next-auth/providers/oauth';

export interface QQProfile {
  id: string,
  nickname: string,
  figureurl_qq_2: string,
  gender: string,

}

export const QQProvider = (
  config: OAuthUserConfig<QQProfile> & {
    appId: string
  }
): OAuthConfig<QQProfile> => {
  return {
    id: 'qq',
    name: 'TencentQQ',
    type: 'oauth',
    authorization: {
      url: 'https://graph.qq.com/oauth2.0/authorize',
      params: {
        response_type: 'code',
        client_id: config.clientId,
        scope: 'get_user_info',
      }
    },
    token: {
      url: 'https://graph.qq.com/oauth2.0/token',
      params: {
        grant_type: 'authorization_code',
        client_id: config.clientId,
        client_secret: config.clientSecret,
      }
    },
    userinfo: {
      request: async ({ tokens }) => {
        const res = await fetch(`https://graph.qq.com/oauth2.0/me?access_token=${tokens.access_token}`).then(async res => await res.json());

        const profile = await fetch(`https://graph.qq.com/user/get_user_info?access_token=${tokens.access_token}&oauth_consumer_key=${config.appId}&openid=${res.openid}`).then(async res => await res.json());
        
        return profile;
      }
    },
    profile(profile) {
      return {
        id: profile.id,
        name: profile.nickname,
        email: '',
        image: profile.figureurl_qq_2,
      };
    }
  };
};