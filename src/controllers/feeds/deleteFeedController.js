import { expressAsyncHandler } from '../../dependencies/express-async-handler.js'

/**
 * @api {delete} /feeds/:id DELETE Feed
 * @apiName Delete Feed
 * @apiGroup Feeds
 *
 * @apiParam {String} id Feed unique ID.
 *
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 * @apiError FeedNotFound The id of the Feed was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Not Found
 */
export default expressAsyncHandler(
    async (req, res, next) => {
        let { feeds } = res.models
        let result = await feeds.remove(req.params.id)
        if (result) return res.sendOkResponse()
        return res.sendNotFoundResponse()
    }
)