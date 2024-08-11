import express, { Request, Response } from 'express'
const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

router.get('/:name', (req: Request, res: Response) => {
  res.send(`Hello ${req.params.name}`)
})

export default router
