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
    const options = {
      headers: {
        'Authorization': 'Basic c29kcHJvZHVjdEpzb246Y29ycFNvZGltYWM=',
        'content-type': 'application/json;charset=UTF-8'
      }
    };
    const data = JSON.stringify({productId : skus});
    const url = `${API_URLS.products}?${data}`;
    console.log(url);
    
    let res = await axios.get(url, options).then((data) => {
        return data;
    }).catch((err) => {
        throw err;
    })
    return res.data || [];
  }
}