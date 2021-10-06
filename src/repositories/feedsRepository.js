import { nanoid } from 'nanoid'
export default collection => ({
    find: async params => collection.find(params).toArray(),
    findOne: async _id => await collection.findOne({ _id }),
    create: async params => (await collection.insertOne({ ...params, _id: nanoid() })).insertedId,
    update: async (_id, params) => collection.updateOne({ _id }, params),
    remove: async _id => (await collection.deleteOne({ _id })).deletedCount
})