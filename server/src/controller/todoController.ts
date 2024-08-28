import express, { Request, Response } from 'express'
import TodoService from '../service/todoService'

const router = express.Router()
const service = new TodoService()

router.get('/', async (req: Request, res: Response) => {
  try {
    res.status(200).send(await service.getTodoItems())
  } catch(e) {
    res.status(500).send({
      error: 'Error retrieving items'
    })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    res.status(200).send(await service.getTodoItem(req.params.id))
  } catch(e) {
    res.status(500).send({
      error: 'Error retrieving item'
    })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const body = req.body
    if (!body) {
      res.status(400).send({
        error: 'Text is required'
      })
    } else {
      await service.insertTodoItem(body.text)
      res.sendStatus(201)
    }
  } catch(e) {
    res.status(500).send({
      error: 'Error inserting item'
    })
  }
})

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const body = req.body
    if (!body) {
      res.status(400).send({
        error: 'No item provided'
      })
    } else {
      await service.updateTodoItem(req.params.id, body)
      res.status(200).send('Updated')
    }
  } catch(e) {
    res.status(500).send({
      error: 'Error updating item'
    })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await service.deleteTodoItem(req.params.id)
    res.status(200).send('Deleted')
  } catch(e) {
    res.status(500).send({
      error: 'Error deleting item'
    })
  }
})

export default router
