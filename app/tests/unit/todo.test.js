const request = require('supertest')
const Server = require('../../utils/server')
const controllers = require('../../controllers/todos.controllers')

const app = new Server().app

// je dois mock les  input (route layer) + mock output (service layer)
const mockTodos = [
    { id: 1, title: 'todo 1' },
    { id: 2, title: 'todo 2' },
    { id: 3, title: 'todo 3' },
]

// Mock de la fonction `todos`
const mockTodosFn = jest.fn().mockResolvedValue(mockTodos)

// Mock de l'objet response
const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
}

describe('getTodos controller', () => {
    it('should return all todos', async () => {
        const req = {}
        const res = mockResponse()

        // Appel du contrôleur avec les mocks
        await controllers.getTodos(req, res, mockTodosFn)

        // Vérification des appels de fonctions
        expect(mockTodosFn).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ data: mockTodos })
    })

    it('should handle errors', async () => {
        const req = {}
        const res = mockResponse()

        // Mock de la fonction `todos` avec une erreur
        const mockError = new Error('Internal Server Error')
        const mockTodosFnWithError = jest.fn().mockRejectedValue(mockError)

        // Appel du contrôleur avec les mocks
        await controllers.getTodos(req, res, mockTodosFnWithError)

        // Vérification des appels de fonctions
        expect(mockTodosFnWithError).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ msg: 'Internal Server Error' })
    })
})

// describe('Todos Unit Testing => *** Route Layer ***', () => {
//     describe('GET /todos', () => {
//         it('should get all todos', async () => {
//             const res = await controllers.getTodos()
//             expect(res.body).toHaveProperty('data')
//             expect(res.body.data).toBeInstanceOf(Array)
//             // expect(res.body.data.length).toBe(4)
//         })
//     })
// })

// describe('Todos Unit Testing => *** Service Layer ***', () => {
//     describe('GET /todos', () => {
//         it('should get all todos', async () => {
//             const res = await controllers.getTodos()
//             expect(res.body).toHaveProperty('data')
//             expect(res.body.data).toBeInstanceOf(Array)
//             // expect(res.body.data.length).toBe(4)
//         })
//     })
// })
