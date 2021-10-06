const injectMongoModel = model => (req, res, next) => {
    res.models = res.models || {}
    res.models[model.collection] = model.repository(res.db.connection.collection(model.collection))
    next()
}

const defaultModel = model => (req, res, next) => {
    res.models = res.models || {}
    res.models[model.collection] = model.repository()
    next()
}

export const injectModel = model => {
    if (process.env.NODE_ENV !== 'test') return injectMongoModel(model)
    if (process.env.NODE_ENV === 'test') return defaultModel(model)
}