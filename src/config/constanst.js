import { config } from 'dotenv';

config();

const API_URLS = {
    products : `${process.env.API_URL}/getProductDetailsJson`,
}

export default API_URLS;