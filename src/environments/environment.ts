// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseApi: 'http://localhost:8080/',
  loginOauth2MicrosoftApi: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=796592e6-58f4-4493-aff0-0786b0e2d416&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fextrator-job%2FaccessCodeCallback&response_mode=query&scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fuser.read%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.read%20https%3A%2F%2Fgraph.microsoft.com%2FMail.ReadWrite&state="
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
