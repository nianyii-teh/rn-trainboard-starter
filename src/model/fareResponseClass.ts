export type FareResponse = {
  numberOfAdults: number;
  numberOfChildren: number;
  outboundJourneys: Array<Journey>;
};

export type Journey = {
  journeyId: string;
  originStation: Record<string, string>;
  destinationStation: Record<string, string>;
  departureTime: string;
  arrivalTime: string;
};
