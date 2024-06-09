const todos = [
    {
        id: 1,
        title: 't1',
    },
    {
        id: 2,
        title: 't2',
    },
    {
        id: 3,
        title: 't3',
    },
    {
        id: 4,
        title: 't4',
    },
]

const getTodos = async (req, res) => {
    try {
        return res.status(200).json({
            data: todos,
        })
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const getTodoById = async (req, res) => {
    try {
        const { id } = req.params

        const todo = todos.find((t) => t.id == Number(id))
        if (!todo) {
            return res.status(404).json({ msg: 'this todo does not exist' })
        }
        res.status(200).json({
            data: todo,
        })
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const createTodo = async (req, res) => {
    const { data } = req.body
    console.log('d => ', data)
    try {
        const newTodo = [...todos, data]
        res.status(201).json({ data: newTodo })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const deleteTodoById = async (req, res) => {
    try {
        const { id } = req.params

        const deletedTodo = todos.find((t) => t.id == Number(id))
        if (!deletedTodo) {
            return res.status(404).json({ msg: 'this todo does not exist' })
        }

        const todoDelete = todos.filter((t) => t.id != id)
        res.status(200).json({ data: todoDelete })
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const updateTodoById = async (req, res) => {
    try {
        const { id } = req.params
        const { data } = req.body

        let updatedTodo = todos.find((t) => t.id == Number(id))

        if (!updatedTodo) {
            return res.status(404).json({ msg: 'this todo does not exist' })
        }

        updatedTodo = todos.map((t) => {
            if (t.id == Number(id)) return { ...t, ...data }
            return t
        })

        res.status(200).json({ data: updatedTodo })
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    updateTodoById,
    deleteTodoById,
}
