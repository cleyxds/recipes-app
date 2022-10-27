const ENVIRONMENT = process.env.NODE_ENV

export enum ALLOWED_ENVIRONMENTS {
  DEV = "development",
  PROD = "production"
}

export const isDevelopment = ENVIRONMENT === ALLOWED_ENVIRONMENTS["DEV"]
