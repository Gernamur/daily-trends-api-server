import { MongoClient } from 'mongodb'

export let connection
export const connect = async () => {
    const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin&readPreference=primary&ssl=false`
    let client = new MongoClient(url)
    connection = (await client.connect()).db(process.env.DB_NAME)
    return connection
}
