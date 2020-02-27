import React, { Component, useState, useEffect } from "react";
import { find, orderBy } from 'lodash';



let instance = null;

interface CountryProps {
  
}

const Country: React.FC<CountryProps> = ({ }) => {
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

  const getAll = () => {
    if (!countries) {
      var newCountries: any = countries;
      newCountries = orderBy(
        countriesData || require('./resources/countries.json'),
        ['name'],
        ['asc'],
      );
      setCountries(newCountries);
    }
    if(countries) {
      return countries;
    }
    return null;
  }

  const getCountryCodes = () => {
    if (!countryCodes.length) {
      getAll().map((country) => {
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

  const getCountryDataByCode = (iso2: any) => {
    return find(getAll(), (country: any) => country.iso2 === iso2);
  }

  return getInstance();

};

Country.defaultProps = {

} as Partial<CountryProps>

export default Country;

interface SetCustomCountriesDataProps {
  
}

export const SetCustomCountriesData: React.FC<SetCustomCountriesDataProps> = ({ }) => {

  return null;
}

SetCustomCountriesData.defaultProps = {

} as Partial<SetCustomCountriesDataProps>



/*
let instance = null;

class Country {
  static getInstance() {
    if (!instance) {
      instance = new Country();
    }
    return instance;
  }

  constructor() {
    this.countryCodes = [];

    this.countriesData = null;
  }

  setCustomCountriesData(json) {
    this.countriesData = json;
  }

  addCountryCode(iso2, dialCode, priority) {
    if (!(dialCode in this.countryCodes)) {
      this.countryCodes[dialCode] = [];
    }

    const index = priority || 0;
    this.countryCodes[dialCode][index] = iso2;
  }

  getAll() {
    if (!this.countries) {
      this.countries = orderBy(
        this.countriesData || require('./resources/countries.json'),
        ['name'],
        ['asc'],
      );
    }

    return this.countries;
  }

  getCountryCodes() {
    if (!this.countryCodes.length) {
      this.getAll().map((country) => {
        this.addCountryCode(country.iso2, country.dialCode, country.priority);
        if (country.areaCodes) {
          country.areaCodes.map((areaCode) => {
            this.addCountryCode(country.iso2, country.dialCode + areaCode);
          });
        }
      });
    }
    return this.countryCodes;
  }

  getCountryDataByCode(iso2) {
    return find(this.getAll(), country => country.iso2 === iso2);
  }
}

export default Country.getInstance();

*/