import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.PORT)

export const PORT = process.env.PORT ;
export const MONGO_URL = process.env.MONGO_URL;
export const JSON_KEY = process.env.JSON_KEY;
