import React, { Component, useState, useEffect } from "react";
import _ from 'lodash';
import Country from './country';
// import numberType from './resources/numberType';

interface PhoneNumberProps {
  getCountryDataByCodeRequest?: boolean,
  PNgetDialCodeRequest?: boolean,
  PNdialNumber?: number,
  iso2?: any,
  PNgetCountryCodeOfNumberRequest?: boolean,
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({ getCountryDataByCodeRequest, PNgetDialCodeRequest, PNgetCountryCodeOfNumberRequest, iso2, PNdialNumber }) => {
  const [instanceState, setInstanceState] = useState(null);
  // const libPhoneNumber = require('google-libphonenumber');
  // const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();
  // const asYouTypeFormatter = libPhoneNumber.AsYouTypeFormatter;

  const getCountryDataByCode = (iso2: any) => {
    // return getCountryDataByCodeC(iso2);
    // return Country({getCountryDataByCodeRequest: true, iso2: iso2});
    // console.log('Test: ', Country({getCountryDataByCodeRequest: true, iso2: iso2}));
    return '';
  }
  /*
  const PNgetDialCode = (number: any) => {
    let dialCode = '';
    // only interested in international numbers (starting with a plus)
    if (number.charAt(0) === '+') {
      let numericChars = '';
      // iterate over chars
      for (let i = 0; i < number.length; i++) {
        const c = number.charAt(i);
        // if char is number
        if (isNumeric(c)) {
          numericChars += c;
          // if current numericChars make a valid dial code
          // if (this.countryCodes[numericChars]) {
          // if (getCountryCodes()[numericChars]) {
          if (Country({getCountryCodesRequest: true})[numericChars]) {
            // store the actual raw string (useful for matching later)
            dialCode = number.substr(0, i + 1);
          }
          // longest dial code is 4 chars
          if (numericChars.length === 4) {
            break;
          }
        }
      }
    }
    return dialCode;
  }
  
  const isNumeric = (n: any) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  
  const PNgetCountryCodeOfNumber = (number: any) => {
    const dialCode = PNgetDialCode(number);
    const numeric = getNumeric(dialCode);
    const countryCode = Country({getCountryCodesRequest: true})[numeric];
  
    // countryCode[0] can be null -> get first element that is not null
    if (countryCode) {
      let data = _.first(countryCode.filter((iso2: any) => iso2));
      if(data != null) {
        return data;
      }
    }
  
    return '';
  }
  */
  
  const getNumeric = (str: any) => {
    return str.replace(/\D/g, '');
  }
  
  if(getCountryDataByCodeRequest == true) {
    return null;
    // return getCountryDataByCode(iso2);
  }

  if(PNgetDialCodeRequest == true) {
    // return PNgetDialCode(PNdialNumber);
    return null;
  }

  if(PNgetCountryCodeOfNumberRequest == true) {
    // return PNgetCountryCodeOfNumber(PNdialNumber);
    return null;
  }

  // return (
  //   instanceState
  // );
  return null;

};

PhoneNumber.defaultProps = {
  getCountryDataByCodeRequest: false,
  PNgetDialCodeRequest: false,
  PNgetCountryCodeOfNumberRequest: false,
  PNdialNumber: 0
} as Partial<PhoneNumberProps>


export default PhoneNumber;



