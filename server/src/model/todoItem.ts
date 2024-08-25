export default class TodoItem {
  id: Number | undefined
  text: string
  createTime: Date | undefined

  constructor(o: any) {
    this.id = o.id
    this.text = o.text
    this.createTime = o.create_time
  }
}
