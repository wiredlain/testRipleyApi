import { Router } from 'express';
import productService from '../../services/productServices'
import { client } from '../../app';
import requiresLogin from '../authentication/firebase-middleware';
let router = Router();

/* GET users listing. */
router.get('/:skus', requiresLogin.requiresAuth, async(req, res, next) => {
  const skus = (req.params.skus).trim();

  const skusKey = `SKUS:${skus}`;

  client.get(skusKey, (err, result) => {
    if (result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    }
    else {
      productService.getProducts(skus).then((data) => {
        const responseJSON = data;
        client.setex(skusKey, 120, JSON.stringify(responseJSON));
        responseJSON.forEach(item => {
          const skuKey = `SKU:${item.partNumber.toLocaleLowerCase()}`;
          client.setex(skuKey, 120, item);
        });
        return res.status(200).json(responseJSON);
      }).catch(err => {
        console.log(err.message);

        return res.status(err.response.status || 404).json({error: err.message});
      });
    }
  });
  //res.send('respuesta de productos');
});

router.get('/by-id/:sku', async(req, res, next) => {
  const sku = (req.params.sku).trim();

  const skuKey = `SKU:${sku}`;

  client.get(skuKey, (err, result) => {
    if (result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    }
    else {
      productService.getProductBySku(sku).then((data) => {
        const responseJSON = data;
        client.setex(skuKey, 120, responseJSON);
        return res.status(200).json(responseJSON);
      }).catch(err => {
        return res.status(err.response.status).json({error: err.message});
      });
    }
  });
});

export default router;
