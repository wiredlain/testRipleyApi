import axios from 'axios';
import API_URLS from '../config/constanst';
import landing from '../mockup/landing';

export default {
  getDataLanding: async () => {
    return landing;
  }
}