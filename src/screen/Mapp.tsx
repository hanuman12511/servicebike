import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Mapp = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data.structured_formatting);
      }}
      query={{
        key: 'AIzaSyBb3j8Aiv60CadZ_wJS_5wg2KBO6081a_k',
        language: 'en',
      }}
    />
  );
};

export default Mapp;