export const injectExpressResponses = (req, res, next) => {
    res.sendOkResponse = result => res.status(200).json(result)
    res.sendCreatedResponse = result => res.status(201).json(result)
    res.sendNotModifiedResponse = () => res.status(304).json()
    res.sendBadRequestResponse = () => res.status(400).json()
    res.sendUnauthorizedResponse = () => res.status(401).json()
    res.sendForbiddenResponse = () => res.status(403).json()
    res.sendNotFoundResponse = () => res.status(404).json()
    res.sendConflictResponse = (message, data) => res.status(409).json({ message, data })
    res.sendServerErrorResponse = err => {
        if (process.env.NODE_ENV === 'development') {
            console.error(err.stack)
        }
        res.status(500).json()
    }
    next()
}


