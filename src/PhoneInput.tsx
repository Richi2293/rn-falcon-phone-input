import React, { Component, useState, useEffect } from "react";
import { Image, TextInput, TouchableWithoutFeedback, View, Text } from "react-native";

import Country from "./country";
import Flags from "./resources/flags";
import PhoneNumber from "./phoneNumber";
import styles from "./styles";
import CountryPicker from "./countryPicker";


interface PhoneInputProps {
  textComponent: any,
  initialCountry: string,
  onChangePhoneNumber: any,
  value: string,
  style: any,
  flagStyle: any,
  textStyle: any,
  offset: number,
  textProps: any,
  onSelectCountry: any,
  onPressCancel: any,
  onPressConfirm: any,
  pickerButtonColor: string,
  pickerBackgroundColor: string,
  pickerItemStyle: any,
  pickerButtonTextStyle: any,
  countriesList: any,
  cancelText: string,
  cancelTextStyle: any,
  confirmText: string,
  confirmTextTextStyle: any,
  disabled: boolean,
  allowZeroAfterCountryCode: boolean,
  confirmTextStyle: any
  onPressFlag: any
}

const PhoneInput: React.FC<PhoneInputProps> = ({ onSelectCountry, onPressFlag, onChangePhoneNumber, allowZeroAfterCountryCode, value, countriesList, disabled, initialCountry, textComponent, style, flagStyle, offset, textStyle, textProps, pickerButtonColor, pickerButtonTextStyle, cancelText, cancelTextStyle, confirmText, confirmTextStyle, pickerBackgroundColor, pickerItemStyle, onPressCancel, onPressConfirm }) => {

  const [inputValue, setInputValue] = useState("0");
  const [valueState, setValue] = useState(null);
  const [disabledState, setDisabled] = useState(false);
  const [refPicker, setRefPicker] = useState(null);
  const [refInputPhone, setRefInputPhone] = useState(null);


  if (countriesList) {
    Country({SetCustomCountriesDataRequest: true, countriesList: countriesList});
  }

  // const countryData: any = getCountryDataByCode(initialCountry);
  const countryData: any = PhoneNumber({getCountryDataByCodeRequest: true, iso2: initialCountry});
  const [formattedNumber, setFormattedNumber] = useState(countryData ? `+${countryData.dialCode}` : "");
  const [iso2, setIso2] = useState(initialCountry);

  useEffect(() => {
    // didMount
    // if (value) {
    //   updateFlagAndFormatNumber(value);
    // }
  });

  const updateFlagAndFormatNumber = (number: any, actionAfterSetState: any = null) => {
    let iso2: any = getISOCode() || initialCountry;
    let formattedPhoneNumber = number;
    if (number) {
      const countryCode = getCountryCode();
      // if (formattedPhoneNumber[0] !== "+" && countryCode !== null) {
      //   formattedPhoneNumber = '+' + countryCode.toString() + formattedPhoneNumber.toString();
      // }
      // formattedPhoneNumber = allowZeroAfterCountryCode ? formattedPhoneNumber : possiblyEliminateZeroAfterCountryCode(formattedPhoneNumber);
      // iso2 = PhoneNumber({PNgetCountryCodeOfNumberRequest: true, PNdialNumber: formattedPhoneNumber});
      
    }
    // this.setState({ iso2, formattedNumber: formattedPhoneNumber, inputValue: number }, actionAfterSetState);
    // setIso2(iso2);
    // setFormattedNumber(formattedPhoneNumber);
    // setInputValue(number);
    // if (actionAfterSetState) {
    //   actionAfterSetState();
    // }
  }

  const getISOCode = () => {
    return iso2;
  }

  const getCountryCode = () => {
    const countryData: any = PhoneNumber({getCountryDataByCodeRequest: true, iso2: initialCountry});
    // return countryData ? countryData.dialCode : null;
    return '';
  }

  const possiblyEliminateZeroAfterCountryCode = (number: any) => {
    const dialCode: any = PhoneNumber({PNgetDialCodeRequest: true, PNdialNumber: number});
    return number.startsWith(`${dialCode}0`)
      ? dialCode + number.substr(dialCode.length + 1)
      : number;
  }

  const onChangePhoneNumberInternal = (number: any) => {
    const actionAfterSetState = onChangePhoneNumber
      ? () => {
        onChangePhoneNumber(number);
      }
      : null;
    updateFlagAndFormatNumber(number, actionAfterSetState);
  }

  const onPressFlagInternal = () => {
    // if (onPressFlag) {
    //   onPressFlag();
    // } else {
    //   if (iso2) this.picker.selectCountry(this.state.iso2);
    //   this.picker.show();
    // }
  }

  // const focus = () => {
  // this.inputPhone.focus();
  // }

  // const blur = () => {
  // this.inputPhone.blur();
  // }

  const selectCountry = (iso2: any) => {
    if (iso2 !== iso2) {
      const countryData: any = PhoneNumber({getCountryDataByCodeRequest: true, iso2: initialCountry});
      if (countryData) {
        setIso2(iso2);
        let dialCode = '';
        if ('dialCode' in countryData) {
          dialCode = `+${countryData.dialCode}`;
        }
        setFormattedNumber(dialCode);
        updateFlagAndFormatNumber(inputValue)
        if (onSelectCountry) {
          onSelectCountry(iso2);
        }
      }
    }
  }

  const TextComponent = textComponent || TextInput;
  let imgTest: any = Flags({ flag: iso2 });

  return (
    <View style={[styles.container, style]}>
      <TouchableWithoutFeedback
        onPress={onPressFlagInternal}
        disabled={disabled}
      >
        <Image
          source={imgTest}
          style={[styles.flag, flagStyle]}
        />
      </TouchableWithoutFeedback>

      <View style={{ flex: 1, marginLeft: offset || 10 }}>
        <TextComponent
          ref={(ref: any) => {
            setRefInputPhone(ref);
          }}
          editable={!disabled}
          autoCorrect={false}
          style={[styles.text, textStyle]}
          onChangeText={(text: any) => {
            onChangePhoneNumberInternal(text);
          }}
          keyboardType="phone-pad"
          underlineColorAndroid="rgba(0,0,0,0)"
          value={inputValue}
          {...textProps}
        />
      </View>
      {/*
      <CountryPicker
        ref={(ref: any) => {
          setRefPicker(ref);
        }}
        selectedCountryProps={iso2}
        onSubmit={selectCountry}
        buttonColorProps={pickerButtonColor}
        buttonTextStyle={pickerButtonTextStyle}
        cancelText={cancelText}
        cancelTextStyle={cancelTextStyle}
        confirmText={confirmText}
        confirmTextStyle={confirmTextStyle}
        pickerBackgroundColor={pickerBackgroundColor}
        itemStyleProps={pickerItemStyle}
        onPressCancel={onPressCancel}
        onPressConfirm={onPressConfirm}
      /> */}
    </View>
  );

};

PhoneInput.defaultProps = {
  initialCountry: "us",
  disabled: false,
  allowZeroAfterCountryCode: true
} as Partial<PhoneInputProps>


export default PhoneInput;
