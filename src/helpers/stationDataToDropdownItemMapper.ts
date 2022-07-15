import { DropdownItem } from '../model/dropDownItem';
import { Station } from '../model/stationNameList';
import uniqBy from 'lodash/uniqBy';

export const mapStationDataToDropdownItem = (
  stationsData: Station[],
): DropdownItem[] => {
  const stationDataDropdownItem: DropdownItem[] = stationsData
    .filter(
      (station) =>
        station.crs !== null &&
        station.crs !== '' &&
        station.name !== null &&
        station.name !== '',
    )
    .map((station) => {
      const stationDropdownItem: DropdownItem = {
        label: station.name,
        value: station.crs,
      };
      return stationDropdownItem;
    });

  return uniqBy(stationDataDropdownItem, 'value');
};
