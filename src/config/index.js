const config = {
  development: {
    baseUrl: "https://api.paycruiser.com",
  },
  staging: {
    baseUrl: "https://staging-api.paycruiser.com",
  },
  sandbox: {
    baseUrl: "https://sandbox-api.paycruiser.com",
  },
  qa: {
    baseUrl: "https://qa-api.paycruiser.com",
  },
  production: {
    baseUrl: "https://api.paycruiser.com",
  },
};

const environment = process.env.REACT_APP_HOST_ENV;

export const baseUrl = config[environment].baseUrl;
