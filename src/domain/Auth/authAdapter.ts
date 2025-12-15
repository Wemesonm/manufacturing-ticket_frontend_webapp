import {AuthCredentials, TokenPairAPI} from './authTypes';

function toAuthCredentials(tokenPair: TokenPairAPI): AuthCredentials {
  return {
    accessToken: tokenPair.access,
    refreshToken: tokenPair.refresh,
  };
}

export const authAdapter = {toAuthCredentials};
