declare var require: any;

export const environment = {
  production: false,
  apiUrl: require('./../.env.json').apiUrl
};
