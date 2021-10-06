import { expressAsyncHandler } from '../../dependencies/express-async-handler.js'

/**
 * @api {get} /feeds GET Feeds
 * @apiName Get Feeds
 * @apiGroup Feeds
 *
 *
 * @apiSuccess {Array} content An array of feeds
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 *     {
 *         "_id": "QF5AWOcVaCepWwI636fft",
 *         "content": "Lorem Ipsum...",
 *         "mediaCompany": "El Mundo Tomorrow",
 *         "dateCreated": (new Date()).toISOString()
 *     }
 * ]
 */
export default expressAsyncHandler(
    async (req, res, next) => {
        let { feeds } = res.models
        let feedsCollection = await feeds.find()
        return res.sendOkResponse(feedsCollection)
    }
)