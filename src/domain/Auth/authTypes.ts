export interface TokenPairAPI {
  access: string;
  refresh: string;
}

export interface SignInPayload {
  username: string;
  password: string;
}

export interface VerifyTokenPayload {
  token: string;
}

export interface RefreshTokenPayload {
  refresh: string;
}

export interface AuthCredentials {
  accessToken: string;
  refreshToken: string;
}
