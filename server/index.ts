import {createServer} from 'http'
import express from 'express'
import next, {NextApiHandler} from 'next'

const port = parseInt(process.env.PORT || '3000')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const nextHandler:NextApiHandler = nextApp.getRequestHandler()

nextApp.prepare().then(async () => {
    const app = express()
    const server = createServer(app)

    app.all("*", (req:any, res:any) => nextHandler(req, res))

    server.listen(port, () => {
        console.log(`Server is listening to port ${port}`)
    })
})

