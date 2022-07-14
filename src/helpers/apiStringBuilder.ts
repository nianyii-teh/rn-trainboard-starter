import { config } from '../config';

export const buildGetFaresApiString = (
  departStationCrsCode: string,
  arriveStationCrsCode: string,
): string => {
  return `${config.baseURL}/v1/fares?originStation=${departStationCrsCode}&destinationStation=${arriveStationCrsCode}&outboundDateTime=2022-07-15T12:16:27.371&numberOfChildren=0&numberOfAdults=1`;
};
