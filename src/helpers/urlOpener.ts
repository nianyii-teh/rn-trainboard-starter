import { Linking } from 'react-native';

export function urlOpenerFunc(url: string) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  Linking.openURL(url);
}
