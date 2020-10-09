import dotEnv from "dotenv";

dotEnv.config();

export const JWT = process.env.JWT || "topsecret";
export const PORT = process.env.PORT || 5000;
export const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost/template-graphql";
export const ENV = process.env.ENV || "DEV";
