export interface CountryBrief {
  name: string;
  alpha3Code: string;
  flag: string;
}

export interface FullCountryData extends CountryBrief {
  population: number;
  region: string;
}