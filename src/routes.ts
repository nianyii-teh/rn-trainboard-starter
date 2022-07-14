import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type FareResultsParams = {
  departStationCrsCode: string;
  arriveStationCrsCode: string;
};

export type ScreenNavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export type RootStackParamList = {
  Home: undefined;
  StationSelect: undefined;
  FareResults: FareResultsParams;
};
