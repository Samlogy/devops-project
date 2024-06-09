const multer = require('multer')

// const S3Service = require('../services/aws_s3.service')
// const RDSService = require('../services/aws_rds.service')

// const tableName = 'todos'
// const dbInstance = new RDSService()

// const s3Service = new S3Service()
// const storage = multer.memoryStorage()
// const upload = multer({
//     storage,
// })

const routeS3 = (route, app) => {
    // app.post(route + 'post-file', upload.single('image'), async (req, res) => {
    //     if (!req.file) return res.status(400).send('No file uploaded.')
    //     try {
    //         await s3Service.uploadFile(req.file)
    //         res.status(200).send('File uploaded successfully.')
    //     } catch (err) {
    //         console.error('Error uploading file to S3:', err)
    //         res.status(500).send('Failed to upload file to S3.')
    //     }
    // })
    // app.get(route + 'get-file/:key', async (req, res) => {
    //     try {
    //         const key = req.params.key
    //         const signedUrl = await s3Service.getSignedUrl(key)
    //         res.status(200).send({ url: signedUrl })
    //     } catch (err) {
    //         console.error('Error fetching files:', err)
    //         res.status(500).send('Failed to fetch files.')
    //     }
    // })
    // app.get(route + 'get-files', async (req, res) => {
    //     try {
    //         const keys = await s3Service.listFiles()
    //         res.json({ keys })
    //     } catch (err) {
    //         console.error('Error:', err)
    //         res.status(500).json({ error: 'Failed to list keys' })
    //     }
    // })
    // app.post(
    //     route + 'post-files',
    //     upload.array('images', 5),
    //     async (req, res) => {
    //         try {
    //             const files = req.files
    //             const uploadPromises = files.map((file) =>
    //                 s3Service.uploadFile(file)
    //             )
    //             await Promise.all(uploadPromises)
    //             res.send('Images uploaded successfully')
    //         } catch (err) {
    //             console.error('Error:', err)
    //             res.status(500).send('Failed to upload images')
    //         }
    //     }
    // )
    // app.delete(route + 'delete-file/:key', async (req, res) => {
    //     try {
    //         const key = req.params.key
    //         await s3Service.deleteFile(key)
    //         res.status(201).send('File deleted successfully!')
    //     } catch (err) {
    //         console.error('Error deleting file:', err)
    //         res.status(500).send('Failed to delete file.')
    //     }
    // })
}

const routeRDS = (route, app) => {
    // app.get(route + 'get-todos', async (req, res) => {
    //     try {
    //         const todos = await dbInstance.readAll(tableName)
    //         res.status(200).json(todos)
    //     } catch (err) {
    //         res.status(500).json({ error: err.message })
    //     }
    // })
    // app.get(route + 'get-todo/:id', async (req, res) => {
    //     const id = req.params.id
    //     try {
    //         const todo = await dbInstance.read(tableName, id)
    //         res.status(200).json(todo)
    //     } catch (err) {
    //         res.status(500).json({ error: err.message })
    //     }
    // })
    // app.post(route + 'post-todo', async (req, res) => {
    //     const { task } = req.body
    //     try {
    //         const newTodo = await dbInstance.create(tableName, {
    //             task,
    //             image_url: '',
    //         })
    //         res.status(201).json(newTodo)
    //     } catch (err) {
    //         res.status(500).json({ error: err.message })
    //     }
    // })
    // app.delete(route + 'delete-todo/:id', async (req, res) => {
    //     const id = req.params.id
    //     try {
    //         await dbInstance.delete(tableName, id)
    //         res.sendStatus(204)
    //     } catch (err) {
    //         res.status(500).json({ error: err.message })
    //     }
    // })
    // app.put(route + 'put-todo/:id', async (req, res) => {
    //     const id = req.params.id
    //     const newData = req.body
    //     try {
    //         const updatedTodo = await dbInstance.update(tableName, id, newData)
    //         res.status(200).json(updatedTodo)
    //     } catch (err) {
    //         res.status(500).json({ error: err.message })
    //     }
    // })
}

module.exports = { routeS3, routeRDS }
