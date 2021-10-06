import { expressAsyncHandler } from "./express-async-handler.js"

export const injectDatabaseConnection = (connection, options = {}) =>
    expressAsyncHandler(
        async (req, res, next) => {
            res.db = {}
            res.db.connection = connection
            next()
            options.autoclose && await connection.close()
        }
    )