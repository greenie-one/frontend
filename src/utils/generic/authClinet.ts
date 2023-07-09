// Make a class to handle auth tokens, access tokens, and refresh tokens, it will have methods to get, set, and delete tokens
// Its constructor will read the tokens from local storage and set them to the class properties
// It will have a method to check if the access token is expired, if it is, it will use the refresh token to get a new access token
// If the refresh token is expired, it will delete the tokens from local storage and throw an error

import { authApiList } from '../../assets/api/ApiList';
import { HttpClient, Result } from './httpClient';

type TokensDTO = {
  accessToken: string;
  refreshToken: string;
};

export class AuthClient {
  private static instance: AuthClient;
  private accessToken: string | null;
  private refreshToken: string | null;

  private constructor() {
    const tokens = localStorage.getItem('auth-tokens');
    if (!tokens) {
      console.log('No tokens found in local storage');
      this.accessToken = null;
      this.refreshToken = null;
    } else {
      const parsedTokens = JSON.parse(tokens);
      this.accessToken = parsedTokens.accessToken;
      this.refreshToken = parsedTokens.refreshToken;
    }
  }

  public static getInstance(): AuthClient {
    if (!AuthClient.instance) {
      AuthClient.instance = new AuthClient();
    }

    return AuthClient.instance;
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public getRefreshToken(): string | null {
    return this.refreshToken;
  }

  public async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    localStorage.setItem('auth-tokens', JSON.stringify({ accessToken, refreshToken }));
  }

  public async deleteTokens(): Promise<void> {
    this.accessToken = null;
    this.refreshToken = null;

    localStorage.removeItem('auth-tokens');
  }

  public async refreshAccessToken(): Promise<Result<TokensDTO>> {
    if (!this.refreshToken) {
      throw new Error('Refresh token is not set');
    }

    const resp: Result<TokensDTO> = await HttpClient.callApi({
      url: authApiList.refreshToken,
      method: 'GET',
      query: {
        refreshToken: this.refreshToken,
      },
    });

    if (resp.ok) {
      await this.setTokens(resp.value.accessToken, resp.value.refreshToken);
    } else {
      if (resp.error.status === 401) {
        console.error('Refresh token is expired or invalid, deleting tokens');
        console.error(resp.error);
        await this.deleteTokens();
      }
      throw new Error(JSON.stringify(resp.error));
    }
    return resp;
  }
}
