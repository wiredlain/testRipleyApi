import { Router } from 'express';
import landingService from '../services/landingConfiguration';
// import { client } from '../app';
// import requiresLogin from '../authentication/firebase-middleware';
let router = Router();

/* GET users listing. */
router.get('/', async(req, res, next) => {
  
  // const skus = (req.query.skus).trim();

  // const skusKey = `SKUS:${skus}`;

  // client.get(skusKey, (err, result) => {
  //   if (result) {
  //     const resultJSON = JSON.parse(result);
  //     return res.status(200).json(resultJSON);
  //   }
  //   else {
      landingService.getDataLanding().then((data) => {
        const responseJSON = data;
        // client.setex(skusKey, 120, JSON.stringify(responseJSON));
        // responseJSON.forEach(item => {
        //   const skuKey = `SKU:${item.partNumber.toLocaleLowerCase()}`;
        //   client.setex(skuKey, 120, item);
        // });
        return res.status(200).json(responseJSON);
      }).catch(err => {
        console.log('err', err);
        
        return res.status(err.response.status || 404).json({error: err.message});
      });
    // }
  // });
  //res.send('respuesta de productos');
});

export default router;
