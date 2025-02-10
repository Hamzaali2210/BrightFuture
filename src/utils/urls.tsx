const ENV = 'production';
export const API_URL_2 =
  ENV === 'staging'
    ? 'https://apis.staging.brightfuturekw.net/api/'
    : ENV === 'production'
    ? 'https://apis.brightfuturekw.net/api/'
    : 'http://127.0.0.1:8000/api/';
export const IMAGE_API_URL =
  ENV === 'staging'
    ? 'https://apis.staging.brightfuturekw.net'
    : ENV === 'production'
    ? 'https://apis.brightfuturekw.net'
    : 'http://127.0.0.1:8000';

// export const API_URL = 'https://brightfuture.netsolutionindia.com/';
// export const API_URL_2 = 'https://brightfuture.netsolutionindia.com/api/';
// export const API_URL_2 = 'https://apis-brightfuture.netsolutionindia.com/api/';
// export const API_URL_2 = 'https://apis.brightfuturekw.net/api/';
