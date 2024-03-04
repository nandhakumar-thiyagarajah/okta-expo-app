import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import oktaConfig from './auth.config';

const useProxy = Platform.select({ web: false, default: true });
// const redirectUri = makeRedirectUri({ useProxy: false });

export const loginWithOkta = async () => {

    const discovery = useAutoDiscovery(
        "https://dev-91323420.okta.com/oauth2/default"
    );
  const { redirectUri, clientId, scopes } = oktaConfig;

  const config = {
    redirectUri,
    clientId,
    scopes
  };

  try {
    const [request, response, promptAsync] = await useAuthRequest(config);
    console.log('Okta Login Result:', response);
    return response;
  } catch (error) {
    console.error('Okta Login Error:', error);
    throw error;
  }
};