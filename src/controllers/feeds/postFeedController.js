import { expressAsyncHandler } from '../../dependencies/express-async-handler.js'

/**
 * 
 * @api {post} /feeds POST Feed
 * @apiGroup Feeds 
 * @apiName Post Feed
 * 
 * @apiParam (Body) {String} content Feed content
 * @apiParam (Body) {String} company Company name
 * @apiParam (Body) {DateTime} dateCreated DateTime creation
 * 
 * @apiSuccess {Feed} data Returns a Feed object
 * @apiSuccessExample {Feed} Success-Response:
 * HTTP/1.1 201 Created
 * 
 * {
 *     "_id": "QF5AWOcVaCepWwI636fft",
 *     "content": "Lorem Ipsum...",
 *     "mediaCompany":"Media Company Name",
 *     "dateCreated": "2021-10-02T11:43:59.607Z"
 * }
 * 
 * @apiError RepeatedFeedError
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *     "message": "Resource already exists",
 *     "data": {
 *         "_id": "5WZXJIEW7bmTF0GRdbhrJ",
 *         "content": "Primero un virus y luego un volcán. Un apocaliptólogo nos explica las razones por las que dios nos castiga de esta forma.",
 *         "mediaCompany": "El Mundo Tomorrow",
 *         "dateCreated": "2021-10-02T11:43:59.607Z"
 *     }
 * }
 */

export default expressAsyncHandler(
    async (req, res, next) => {
        let { feeds } = res.models

        let feedsCollection = await feeds.find({ content: req.body.content })
        if (feedsCollection.length) return res.sendConflictResponse('Resource already exists', feedsCollection[0])
        let _id = await feeds.create({
            content: req.body.content,
            mediaCompany: req.body.mediaCompany,
            dateCreated: req.body.dateCreated
        })
        return res.sendCreatedResponse(await feeds.findOne(_id))
    }
)