import { config } from 'dotenv';
config();
const API_URLS = {
    products : `${process.env.API_URL}/products`,
}

export default API_URLS;