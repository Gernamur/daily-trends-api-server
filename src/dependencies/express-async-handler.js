export const expressAsyncHandler = middleware => (req, res, next) =>
    middleware(req, res, next)
        .catch(err => next(err))