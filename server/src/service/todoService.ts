import TodoDAO from '../dao/todoDAO'
import logger from '../log/logger'
import TodoItem from '../model/todoItem'

export default class TodoService {

  private dao: TodoDAO = new TodoDAO()

  async getTodoItems(): Promise<TodoItem[]> {
    try {
      return await this.dao.getTodoItems()
    } catch(e) {
      logger.error(e, 'Error retrieving items')
      throw e
    }
  }

  async getTodoItem(id: string): Promise<TodoItem> {
    try {
      return await this.dao.getTodoItem(id)
    } catch(e) {
      logger.error(e, 'Error retrieving item %s', id)
      throw e
    }
  }

  async insertTodoItem(text: string): Promise<void> {
    try {
      const item = new TodoItem({ text })
      await this.dao.insertItem(item)
    } catch(e) {
      logger.error(e, 'Failed to insert item')
      throw e
    }
  }

  async updateTodoItem(id: string, item: TodoItem): Promise<void> {
    try {
      await this.dao.updateItem(id, item)
    } catch(e) {
      logger.error(e, 'Failed to update item')
      throw e
    }
  }

  async deleteTodoItem(id: string): Promise<void> {
    try {
      await this.dao.deleteItem(id)
    } catch(e) {
      logger.error(e, 'Failed to delete item')
      throw e
    }
  }
}
