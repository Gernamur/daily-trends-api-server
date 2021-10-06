import express from "express";

import { injectModel } from './dependencies/inject-model.js'

import indexController from "./controllers/indexController.js";

import getFeedsController from './controllers/feeds/getFeedsController.js'
import getFeedByIdController from './controllers/feeds/getFeedByIdController.js'
import postFeedController from "./controllers/feeds/postFeedController.js"
import deleteFeedController from './controllers/feeds/deleteFeedController.js'

import feedsModel from './models/feedsModel.js'

const router = express.Router();

router.get('/', indexController)

router.get('/feeds',injectModel(feedsModel),getFeedsController)
router.get('/feeds/:id',injectModel(feedsModel),getFeedByIdController)
router.post('/feeds',injectModel(feedsModel),postFeedController)
router.delete('/feeds/:id',injectModel(feedsModel),deleteFeedController)

export default router

