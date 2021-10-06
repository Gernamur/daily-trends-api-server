import { nanoid } from 'nanoid'

export const repositoryFromCollection = collection => {
    if (!Array.isArray(collection)) throw new Error('Excpected array, found ' + typeof collection)
    
    const find = async filter =>
        filter ?
            collection.filter(x =>
                Object.entries(filter)
                    .reduce((result, next) => result && x[next[0]] === next[1]
                        , true
                    )
            )
                .map(x => ({ ...x }))
            : collection


    const findOne = async id => {
        let doc = collection.find(x => x._id === id)
        if (doc) return { ...doc }
    }

    const create = async ({ _id, ...doc }) => {
        let _doc = { _id: _id || nanoid(), ...doc }
        collection.push(_doc)
        return _doc
    }
    const update = async (id, values) => {
        let doc = collection.find(x => x._id === id)
        Object.entries(values).forEach(([key, value]) => {
            doc[key] = value
        })
        return { ...doc }
    }

    const remove = async id => {
        let len = collection.length
        let element = collection.find(x => x._id === id)
        collection.splice(collection.indexOf(element),1)
        return collection.length < len
    }

    return {
        find,
        findOne,
        create,
        update,
        remove
    }
}