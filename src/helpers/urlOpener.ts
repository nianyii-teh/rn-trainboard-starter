import { Linking } from 'react-native';

export function openUrlInBrowser(
  departStation: string | null,
  arriveStation: string | null,
) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  Linking.openURL(
    `https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/${departStation}/${arriveStation}/#LiveDepResults`,
  );
}
