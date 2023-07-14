type AuthTokens = {
  accessToken: string;
  profile_hints?: {
    first_name: string;
    last_name: string;
  };
  refreshToken: string;
};
