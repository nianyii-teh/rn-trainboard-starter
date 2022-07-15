export type StationNameResponse = {
  stations: Station[];
};

export type Station = {
  name: string;
  crs: string;
};
