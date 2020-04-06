import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './logger';
dotenv.config();

mongoose.Promise = global.Promise;
const connection = mongoose.connect(process.env.MONGODB_URI, {
  autoIndex: true,
  poolSize: 50,
  bufferMaxEntries: 0,
  keepAlive: 120,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

connection
    .then(db => db)
    .catch(logger.error);

export default connection;
