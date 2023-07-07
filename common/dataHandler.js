const { generateId } = require("../utils/helpers");

const singleDBQuery = async (dataModel, data) => {

    //create
    data.id = data?.id ? data.id : generateId()
    let response = await addData(dataModel, data)
    return response

}

const multipleDBQuery = async (dataModel, data, toDelete = false) => {

    let created = 0
    let updated = 0
    let deleted = toDelete ? data.length : 0

    //create
    if (toDelete) {

        const itensId = data.map((item) => {
            return item?.id
        })

        dataModel.destroy({ where: { id: itensId } })

    } else {
        for (let item of data) {
            item.id = item?.id ? item.id : generateId()
            let response = await addData(dataModel, item)
            if (response.created) {
                created++
            } else {
                updated++
            }
        }
    }

    return { stats: { created: created, updated: updated, deleted: deleted } }

}


const addData = async (dataModel, data) => {

    const [value, created] = await createOrUpdate(dataModel, data)
    console.log({ created })
    return { value, created }

}


const deleteData = async (dataModel, data) => {

}

const createOrUpdate = async (dataModel, data) => {

    // console.log(data)

    let created = true

    let queryResult = await dataModel.findOne({ where: { id: data.id } })

    if (queryResult) {
        created = false
        await dataModel.update(data, { where: { id: data.id } })
    } else {
        await dataModel.create(data)
    }

    return [data, created]
}


const checkDataExist = async (dataModel, data) => {

    if (!data?.id) {
        return null
    }


    let id = data.id;
    let result = await dataModel.findOne({ where: { id: id } })

    if (result) {
        return result
    }

    return null;

}

module.exports = {
    singleDBQuery,
    multipleDBQuery
}