import { expressAsyncHandler } from '../../dependencies/express-async-handler.js'

/**
 * @api {get} /feeds/:id GET Feeds by ID
 * @apiName Get Feed
 * @apiGroup Feeds
 *
 * @apiParam {String} id Feed unique ID.
 *
 * @apiSuccess {String} _id ID of the Feed.
 * @apiSuccess {String} content  Content of the Feed.
 * @apiSuccess {String} mediaCompany  Media company of the Feed.
 * @apiSuccess {Date} dateCreated  Date creation of the feed
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "_id": "QF5AWOcVaCepWwI636fft",
 *     "content": "Lorem Ipsum...",
 *     "mediaCompany": "El Mundo Tomorrow",
 *     "dateCreated": (new Date()).toISOString()
 * }
 *
 * @apiError FeedNotFound The id of the Feed was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Not Found
 */
export default expressAsyncHandler(
    async (req, res, next) => {
        let { feeds } = res.models
        let feedsCollection = await feeds.findOne(req.params.id)
        if(!feedsCollection) return res.sendNotFoundResponse()
        return res.sendOkResponse(feedsCollection)
    }
)