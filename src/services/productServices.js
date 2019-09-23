import axios from 'axios';
import API_URLS from '../config/constanst';

export default {
  getProductBySku: async (sku) => {
    const url = `${API_URLS.products}/${sku}`;
    let res = await axios.get(url).then((data) => {
        return data;
    }).catch((err) => {
        throw err;
    })
    return res.data || [];
  },

  getProducts: async (skus) => {
    const url = `${API_URLS.products}?partNumbers=${skus}`;
    let res = await axios.get(url).then((data) => {
        return data;
    }).catch((err) => {
        throw err;
    })
    return res.data || [];
  }
}