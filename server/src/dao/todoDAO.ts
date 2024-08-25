import { query, transaction } from '../db/db'
import logger from '../log/logger'
import TodoItem from '../model/todoItem'

export default class TodoDAO {

  async getTodoItems(): Promise<TodoItem[]> {
    logger.info('Retrieving all items')

    const result = await query('SELECT * FROM express_toy.todo;')

    return result.rows.map(r => new TodoItem(r))
  }

  async insertItem(item: TodoItem): Promise<void> {
    logger.info('Inserting new item')

    const result = await transaction('INSERT INTO express_toy.todo (text) values ($1);', [item.text])

    if (result?.rowCount !== 1) {
      throw new Error('Did not insert record')
    }
  }

  async updateItem(id: string, item: TodoItem): Promise<void> {
    logger.info('Updating item with id %s', id)

    const result = await transaction('UPDATE express_toy.todo SET text = $1 WHERE id = $2', [item.text, id])

    if (result?.rowCount !== 1) {
      throw new Error('Error updating record')
    }
  }

  async deleteItem(id: string): Promise<void> {
    logger.info('Deleting item with id %s', id)

    const result = await transaction('DELETE FROM express_toy.todo WHERE id = $1', [id])

    if (result?.rowCount !== 1) {
      throw new Error('Error deleting record')
    }
  }
}
