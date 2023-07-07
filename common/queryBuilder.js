const { Op } = require("@sequelize/core")

const getPageCount = (total, pageSize) => {

    let quotient = Math.floor(total / pageSize)
    let res = total % pageSize

    return res > 0 ? quotient + 1 : quotient
}

const queryBuilder = async (mainModel, queryString, options) => {

    const validFilters = { eq: "eq", ne: "ne", like: "substring", gt: "gt", gte: "gte", lt: "lt", lte: "lte" };

    let fields = getFields(options.validFields, options.selectedFields)

    // console.log({ fields })

    let queryOptions = {}
    queryOptions.attributes = fields

    if (options.pager.paging) {
        queryOptions.limit = options?.pager?.pageSize
        queryOptions.offset = options?.pager?.page == 1 ? 0 : (options?.pager?.page - 1) * options?.pager?.pageSize
    }

    let filters = Array.isArray(queryString.filters) ? queryString.filters : (queryString.filters ? [queryString.filters] : [])
    // console.log({ filters })

    let whereClauses = []
    for (let filter of filters) {
        // console.log({ filter })
        let clause = filter?.split(":");

        let whereClause = {}
        whereClause[clause[0]] = { [Op[validFilters[clause[1]]]]: clause[2] }

        whereClauses.push(whereClause)

        // queryOptions.where = { [Op.and]: {name: {[Op['substring']]: "dark"}} }
    }

    queryOptions.where = { [Op.and]: whereClauses }

    let data = await mainModel.findAndCountAll(queryOptions)

    return data;

}

const getFields = (validFields, selectedFields) => {

    if (selectedFields?.includes("*")) {
        return null
    }

    let fields = validFields.filter(value => selectedFields?.includes(value));

    return fields.length > 0 ? fields : ['id', 'name']

}

const paginationOptions = (queryString) => {

    let paging = queryString?.paging ? (queryString?.paging === "true" ? true : false) : true;
    let page = parseInt(queryString?.page) > 0 ? parseInt(queryString.page) : 1;
    let pageSize = parseInt(queryString?.pageSize) > 0 ? parseInt(queryString.pageSize) : 10;

    return { paging, pageSize, page }

}


module.exports = {
    getPageCount,
    queryBuilder,
    paginationOptions
}