import express from 'express'
import cors from 'cors'
import router from './routes.js'
import serveIndex from 'serve-index'
import { injectExpressResponses } from './dependencies/inject-express-responses.js'
import { injectDatabaseConnection } from './dependencies/inject-database.js'
import { connect } from './mongoConnection.js'

const app = express()

app.use(cors(
    {
        origin: '*',
        optionsSuccessStatus: 200
    }
))

app.use(injectExpressResponses)

if (process.env.NODE_ENV !== 'test') {
    app.use(injectDatabaseConnection(await connect()))
}

app.use(express.json());

app.use('/', router)
app.use('/doc', express.static('doc'), serveIndex('doc', { 'icons': true }))


// 404 - Not found
app.use(function (req, res) {
    if (!res.headersSent) res.sendNotFoundResponse()
});

// 500 - Global Error Handler
app.use(function (err, req, res, next) {
    if (!res.headersSent) res.sendServerErrorResponse(err)
})

export default app