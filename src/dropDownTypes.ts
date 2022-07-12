import React from 'react';

export type DropdownProps = {
  items: DropdownItem[];
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export type DropdownItem = {
  label: string;
  value: string;
};
