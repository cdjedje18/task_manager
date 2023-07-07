const db = require('../models');
const { generateId, getPageCount } = require('../utils/helpers');
const { queryBuilder, paginationOptions } = require('../common/queryBuilder');
const { singleDBQuery, multipleDBQuery } = require('../common/dataHandler');
const { apiResponse } = require('../common/apiResponse');



const Task = db.tasks;



const taskController = {
    index: async (req, res) => {

        let paginationParams = paginationOptions(req.query)

        let responseData = {}

        console.log(paginationParams)

        let tasks = await queryBuilder(Task, req.query, {
            validFields: ['id', 'name', 'description', '*'],
            selectedFields: req.query.fields ? (req.query.fields).split(",") : null,
            pager: paginationParams
        })

        if (paginationParams.paging) {
            responseData.pager = {
                total: tasks.count,
                pageCount: getPageCount(tasks.count, paginationParams.pageSize),
                page: paginationParams.page,
                pageSize: paginationParams.pageSize
            }
        }

        responseData.tasks = tasks.rows

        res.status(200).send(responseData)
    },
    show: async (req, res) => {
        let id = req.params.id
        let task = await Task.findOne({ where: { id: id } })
        res.status(200).send(task)
    },
    store: async (req, res) => {
        // console.log(req.body)

        let response = null;

        if (req?.body?.tasks) {

            //validation
            //data insert
            let importSummary = await multipleDBQuery(Task, req?.body?.tasks, req?.query?.delete)
            response = apiResponse(req?.query?.delete ? 200 : 201, req?.query?.delete ? "Data Deleted" : "Data Created", importSummary)

        } else {

            //validation
            //data insert
            let importSummary = await singleDBQuery(Task, req.body)
            response = apiResponse(201, "Data Created", importSummary)

        }

        res.status(201).send(response);

    },
    update: async (req, res) => {
        let response = null;
        let id = req.params.id;
        let result = await Task.update(req.body, { where: { id: id } });
        if (result) {
            let task = await Task.findOne({ where: { id: id } })
            res.status(200).send({ status: 200, task: task });
            response = apiResponse(201, "Data Updated", task)
        } else {
            response = apiResponse(500, "Internal Server Error", null)
        }

        res.status(response.httpStatusCode).send(response);

    },
    delete: async (req, res) => {
        let response = null;
        let id = req.params.id;
        let result = await Task.destroy({ where: { id: id } });
        if (result) {
            
            response = apiResponse(200, "Data Deleted", null)
        } else {
            response = apiResponse(500, "Internal Server Error", null)
        }

        res.status(response.httpStatusCode).send(response);

    }

}

module.exports = taskController;