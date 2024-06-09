const request = require('supertest')
const Server = require('../../utils/server')

const app = new Server().app

beforeAll(async () => {
    // await mongoose.connect(process.env.MONGODB_URI)
    // connect to database
})

afterAll(async () => {
    // await mongoose.connection.close()
    // delete all items / close connection to database
})

describe('Todos Integration Testing ....', () => {
    describe('GET /todos', () => {
        beforeEach(async () => {
            // add 5 items inside the database
            // check number of returned items, ...
        })
        it('should get all todos', async () => {
            const res = await request(app).get('/todos')
            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('data')
            expect(res.body.data).toBeInstanceOf(Array)
            // expect(res.body.data.length).toBe(4)
        })
    })

    describe('GET /todos/:id', () => {
        it('should get a todo by the given id', async () => {
            const todoId = 1
            const res = await request(app).get(`/todos/${todoId}`)
            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('data')
            expect(res.body.data).toHaveProperty('title', 't1')
        })

        it('should return 404 if the todo does not exist', async () => {
            const todoId = 999
            const res = await request(app).get(`/todos/${todoId}`)
            expect(res.statusCode).toBe(404)
            // expect(res.body).toHaveProperty('msg', 'this todo does not exist')
        })
    })

    describe('POST /todos', () => {
        it('should create a new todo', async () => {
            const newTodo = {
                id: 5,
                title: 't5',
            }
            const res = await request(app)
                .post('/todos')
                .send({ data: newTodo })
            expect(res.statusCode).toBe(201)
            expect(res.body).toHaveProperty('data')
            expect(res.body.data).toBeInstanceOf(Array)
            expect(res.body.data.length).toBe(5)
            expect(res.body.data[4]).toHaveProperty('title', 't5')
        })
    })

    // Test pour supprimer un todo par ID
    describe('DELETE /todos/:id', () => {
        beforeEach(async () => {
            // add an item to DB
        })
        it('should delete a todo by the given id', async () => {
            const todoId = 1
            const res = await request(app).delete(`/todos/${todoId}`)
            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('data')
            expect(res.body.data).toBeInstanceOf(Array)
            expect(res.body.data.length).toBe(3)
        })

        it('should return 404 if the todo to be deleted does not exist', async () => {
            const todoId = 999
            const res = await request(app).delete(`/todos/${todoId}`)
            expect(res.statusCode).toBe(404)
            expect(res.body).toHaveProperty('msg', 'this todo does not exist')
        })
    })

    // Test pour mettre à jour un todo par ID
    describe('PUT /todos/:id', () => {
        beforeEach(async () => {
            // add an item to DB
        })
        afterEach(async () => {
            // delete the added item from DB
        })
        it('should update a todo by the given id', async () => {
            const todoId = 1
            const updatedTodo = {
                title: 'updated title',
            }
            const res = await request(app)
                .put(`/todos/${todoId}`)
                .send({ data: updatedTodo })
            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('data')
            expect(res.body.data).toBeInstanceOf(Array)
            expect(res.body.data[0]).toHaveProperty('title', 'updated title')
        })

        it('should return 404 if the todo to be updated does not exist', async () => {
            const todoId = 999
            const updatedTodo = {
                title: 'updated title',
            }
            const res = await request(app)
                .put(`/todos/${todoId}`)
                .send({ data: updatedTodo })
            expect(res.statusCode).toBe(404)
            expect(res.body).toHaveProperty('msg', 'this todo does not exist')
        })
    })
})

// layers: route => serivce => prisma (UNIT)
// all layers at a time (INTEGRATION)
