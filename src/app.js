import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import path from 'path';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    mongoose.connect(
      'mongodb://devhouse:devhouse@devhouse-shard-00-00.icdyx.mongodb.net:27017,devhouse-shard-00-01.icdyx.mongodb.net:27017,devhouse-shard-00-02.icdyx.mongodb.net:27017/devhouse?ssl=true&replicaSet=atlas-tjfsa7-shard-0&authSource=admin&retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );

    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
