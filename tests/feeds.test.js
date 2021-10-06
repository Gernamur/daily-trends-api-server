import test from 'tape'
import request from 'supertest'
import app from '../src/app.js'
import { repositoryFromCollection } from './testDependencies/repository-from-collection.js'
import feedsModel from '../src/models/feedsModel.js'

const collection = [
    {
        "_id": "QF5AWOcVaCepWwI636fft",
        "content": "Primero un virus y luego un volcán. Un apocaliptólogo nos explica las razones por las que dios nos castiga de esta forma.",
        "mediaCompany": "El Mundo Tomorrow",
        "dateCreated": (new Date()).toISOString()
    }
]

// mock repository
feedsModel.repository = () => repositoryFromCollection(collection)

test('001 POST /feeds - Create', t => {
    request(app)
        .post('/feeds')
        .send({
            "content": "Lily y Lana Wachowski explican las razones que llevaron a sustituir a Keanu Reeves por John Wick para Matrix 4",
            "mediaCompany": "El Mundo Tomorrow",
            "dateCreated": (new Date()).toISOString()
        })
        .expect(201)
        .then(() => t.pass('Can create feeds'))
        .catch(err => t.fail(err.message))
        .finally(t.end)
})

test('002 POST /feeds - Create existing feed with same content', t => {
    request(app)
        .post('/feeds')
        .send({
            "content": collection[0].content,
            "mediaCompany": "El Mundo Tomorrow",
            "dateCreated": (new Date()).toISOString()
        })
        .expect(409)
        .then(() => t.pass('Cant create feeds with same content of an existing feed'))
        .catch(err => t.fail(err.message))
        .finally(t.end)
})


test('003 GET /feeds', t => {
    request(app)
        .get('/feeds')
        .expect(200)
        .then(() => t.pass('Can retrieve feeds'))
        .catch(err => t.fail(err.message))
        .finally(t.end)
})

test('004 GET /feeds/:id', t => {
    request(app)
        .get(`/feeds/${collection[0]._id}`)
        .expect(200)
        .then(() => t.pass('Can retrieve feeds by id'))
        .catch(err => t.fail(err.message))
        .finally(t.end)
})

test('005 DELETE /feeds', t => {
    const agent = request(app)

    const firstIdFromCollection = collection[0]._id

    agent
        .delete(`/feeds/${firstIdFromCollection}`)
        .expect(200)
        .then(() =>
            agent.get(`/feeds/${firstIdFromCollection}`)
                .expect(404)
        )
        .then(() => t.pass('Can delete feeds'))
        .catch(err => t.fail(err.message))
        .finally(t.end)
})