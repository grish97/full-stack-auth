import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
};
