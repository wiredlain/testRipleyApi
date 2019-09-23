import express, { Router, urlencoded } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import redis from 'redis';
import bluebird from 'bluebird';
import logger from './utils/logger';
import winston from 'winston';

config();

const router = Router();
import { firebase } from './authentication/firebase';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import indexRouter from './routes/index';
import productsRouter from './routes/products';


bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const app = express();

const LoggerMiddleware = (req,res,next) => {

  const random = Math.floor(Math.random() * 100) + 1;
  const { originalUrl } = req;
  if (random < 15 && (originalUrl.indexOf('login') === -1)) {
    let errorMessage = `Error Code: 500\nMessage: error simulado`;
    logger.error(`500 - ${errorMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.status(500).send(errorMessage);
  }

  next();
};

app.use(LoggerMiddleware);

const REDIS_URL = process.env.REDIS_URL;
export const client = redis.createClient(REDIS_URL)

client.on('connect', () => {
  console.log(`connected to redis`);
});
client.on('error', err => {
  console.log(`Error: ${err}`);
});


// view engine setup
app.set('views', join(__dirname, '../src/views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(helmet());
// if ('development' === process.env || 'test' === process.env) {
  logger.debug("Overriding 'Express' logger");
  app.use(morgan('combined', { stream: winston.stream.write }));
  //app.use(errorHandler()); // Error handler - has to be last
// }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

router.use('/', indexRouter);
router.use('/products', productsRouter);

app.use('/api', router);

// error handler
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Escribimos el error
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  });

export default app;
