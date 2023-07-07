const express = require('express');
const taskController = require('../controllers/taskController');

const routes = express.Router();

routes.get("/tasks", taskController.index)
routes.post("/tasks", taskController.store)
routes.get("/tasks/:id", taskController.show)
routes.put("/tasks/:id", taskController.update)
routes.delete("/tasks/:id", taskController.delete)


module.exports = routes;