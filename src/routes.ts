import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type FareResultsParam = {
  departStation: string | null;
  arriveStation: string | null;
};

export type ScreenNavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  StationSelect: undefined;
  FareResults: FareResultsParam;
};
