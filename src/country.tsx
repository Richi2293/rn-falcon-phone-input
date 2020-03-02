import React, { Component, useState, useEffect } from "react";
import { find, orderBy } from 'lodash';
import Countriesjson from './resources/countries';

let instance = null;

interface CountryProps {
  getCountryDataByCodeRequest?: boolean,
  getCountryCodesRequest?: boolean,
  CgetAllRequest?: boolean,
  SetCustomCountriesDataRequest?: boolean,
  iso2?: any,
  countriesList?: any
}

const Country: React.FC<CountryProps> = ({ countriesList, SetCustomCountriesDataRequest, CgetAllRequest, getCountryDataByCodeRequest, getCountryCodesRequest, iso2 }) => {
  const [instanceState, setInstanceState] = useState(null);
  const [countryCodes, setCountryCodes] = useState([]);
  const [countriesData, setCountriesData] = useState(null);
  const [countries, setCountries] = useState(null);

  const getInstance = () => {
    // if (!instance) {
    //   instance = new Country();
    // }
    return instance;
  }

  const CgetAll = () => {
    if (!countries) {
      var newCountries: any = countries;
      newCountries = orderBy(
        // countriesData || require('./resources/countries.json'),
        countriesData || Countriesjson,
        ['name'],
        ['asc'],
      );
      setCountries(newCountries);
    }
    if (countries) {
      return countries;
    }
    return null;
  }

  const getCountryDataByCodeC = (iso2: any) => {
    return find(CgetAll(), (country: any) => country.iso2 === iso2);
  }

  const setCustomCountriesData = (json: any) => {
    setCountriesData(json);
  }

  const addCountryCode = (iso2: any, dialCode: any, priority: any) => {
    if (!(dialCode in countryCodes)) {
      let newCountryCodes: any = countryCodes;
      newCountryCodes[dialCode] = [];
      setCountryCodes(newCountryCodes);
    }
  
    const index = priority || 0;
    let newCountryCodes: any = countryCodes;
    newCountryCodes[dialCode][index] = iso2;
    setCountryCodes(newCountryCodes);
  }
  
  const getCountryCodes = () => {
    if (!countryCodes.length) {
      CgetAll().map((country) => {
        addCountryCode(country.iso2, country.dialCode, country.priority);
        if (country.areaCodes) {
          country.areaCodes.map((areaCode) => {
            addCountryCode(country.iso2, country.dialCode + areaCode, null);
          });
        }
      });
    }
    return countryCodes;
  }

  if(getCountryDataByCodeRequest == true) {
    return getCountryDataByCodeC(iso2);
  }

  if(getCountryCodesRequest == true) {
    return getCountryCodes();
  }

  if(CgetAllRequest == true) {
    return CgetAll();
  }

  if(SetCustomCountriesDataRequest == true) {
    return setCustomCountriesData(countriesList);
  }

  return getInstance();

};

Country.defaultProps = {
  getCountryDataByCodeC: false, 
  getCountryCodes: false,
  CgetAllRequest: false,
  SetCustomCountriesDataRequest: false,
  countriesList: []
} as Partial<CountryProps>

export default Country;


