// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  googleapiURL: 'https://www.googleapis.com/calendar/v3',
  calculatorApiURL: 'https://prec-api.azurewebsites.net/api',
  wordpressBlogURL: 'http://blog.puertoricoeracing.com/',
  // backendAPIURL: 'http://localhost:3000/api'
  backendAPIURL: 'https://puertoricoeracingclub.herokuapp.com/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
