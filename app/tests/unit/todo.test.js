const request = require('supertest')
const Server = require('../../utils/server')
const controllers = require('../../controllers/todos.controllers')

const app = new Server().app

describe('Todos Unit Testing => *** Controller Layer ***', () => {
    // je dois mock les  input (route layer) + mock output (service layer)
    describe('GET /todos', () => {
        it('should get all todos', async () => {
            const res = await controllers.getTodos()
            expect(res.body).toHaveProperty('data')
            expect(res.body.data).toBeInstanceOf(Array)
            // expect(res.body.data.length).toBe(4)
        })
    })
})
