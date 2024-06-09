const controllers = require('../controllers/todos.controllers')

const routeTodo = (route, app) => {
    app.get(route, controllers.getTodos)
    app.get(route + '/:id', controllers.getTodoById)
    app.post(route, controllers.createTodo)
    app.delete(route + '/:id', controllers.deleteTodoById)
    app.put(route + '/:id', controllers.updateTodoById)
}

module.exports = routeTodo
