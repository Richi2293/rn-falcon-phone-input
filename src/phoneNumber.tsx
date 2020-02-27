import _ from 'lodash';

import Country, { getCountryDataByCodeC, getCountryCodes } from './country';
import numberType from './resources/numberType';

const libPhoneNumber = require('google-libphonenumber');
const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();
const asYouTypeFormatter = libPhoneNumber.AsYouTypeFormatter;

let instance: any = null;


interface PhoneNumberProps {

}

const PhoneNumber: React.FC<PhoneNumberProps> = ({ }) => {

  return (
    instance
  );

};

PhoneNumber.defaultProps = {

} as Partial<PhoneNumberProps>


export default PhoneNumber;



export const getCountryDataByCode = (iso2: any) => {
  return getCountryDataByCodeC(iso2);
}

export const PNgetDialCode = (number: any) => {
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
        if (getCountryCodes()[numericChars]) {
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

export const PNgetCountryCodeOfNumber = (number: any) => {
  const dialCode = PNgetDialCode(number);
  const numeric = getNumeric(dialCode);
  const countryCode = getCountryCodes()[numeric];

  // countryCode[0] can be null -> get first element that is not null
  if (countryCode) {
    let data = _.first(countryCode.filter((iso2: any) => iso2));
    if(data != null) {
      return data;
    }
  }

  return '';
}


const getNumeric = (str: any) => {
  return str.replace(/\D/g, '');
}


/*

const libPhoneNumber = require('google-libphonenumber');
const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();
const asYouTypeFormatter = libPhoneNumber.AsYouTypeFormatter;

let instance: any = null;

class PhoneNumber {
  static getInstance() {
    if (!instance) {
      instance = new PhoneNumber();
    }
    return instance;
  }

  getAllCountries() {
    return Country.getAll();
  }

  getDialCode(number: any) {
    let dialCode = '';
    // only interested in international numbers (starting with a plus)
    if (number.charAt(0) === '+') {
      let numericChars = '';
      // iterate over chars
      for (let i = 0; i < number.length; i++) {
        const c = number.charAt(i);
        // if char is number
        if (this.isNumeric(c)) {
          numericChars += c;
          // if current numericChars make a valid dial code
          // if (this.countryCodes[numericChars]) {
          if (Country.getCountryCodes()[numericChars]) {
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

  getNumeric(str: any) {
    return str.replace(/\D/g, '');
  }

  isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  getCountryCodeOfNumber(number: any) {
    const dialCode = this.getDialCode(number);
    const numeric = this.getNumeric(dialCode);
    const countryCode = Country.getCountryCodes()[numeric];

    // countryCode[0] can be null -> get first element that is not null
    if (countryCode) {
      return _.first(countryCode.filter((iso2: any) => iso2));
    }

    return '';
  }

  parse(number: any, iso2: any) {
    try {
      return phoneUtil.parse(number, iso2);
    } catch (err) {
      console.log(`Exception was thrown: ${err.toString()}`);
      return null;
    }
  }

  isValidNumber(number: any, iso2: any) {
    const phoneInfo = this.parse(number, iso2);

    if (phoneInfo) {
      return phoneUtil.isValidNumber(phoneInfo);
    }

    return false;
  }

  format(number: any, iso2: any) {
    const formatter = new asYouTypeFormatter(iso2)
    let formatted;

    number.replace(/-/g, '')
      .replace(/ /g, '')
      .split('')
      .forEach((n: any) => formatted = formatter.inputDigit(n));

    return formatted;
  }

  getNumberType(number: any, iso2: any) {
    const phoneInfo = this.parse(number, iso2);
    const type = phoneInfo ? phoneUtil.getNumberType(phoneInfo) : -1;
    return _.findKey((numberType: any, noType: any) => noType === type);
  }

  getCountryDataByCode(iso2: any) {
    return Country.getCountryDataByCode(iso2);
  }
}

export default PhoneNumber.getInstance();

*/