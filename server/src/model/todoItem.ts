export default class TodoItem {
  private _id: Number | undefined
  private _text: string
  private _createTime: Date | undefined

  constructor(o: any) {
    this._id = o.id
    this._text = o.text
    this._createTime = o.create_time
  }

  public get id(): Number | undefined {
    return this._id
  }

  public set id(value: Number | undefined) {
    this._id = value
  }

  public get text(): string {
    return this._text
  }

  public set text(value: string) {
    this._text = value
  }

  public get createTime(): Date | undefined {
    return this._createTime
  }

  public set createTime(value: Date | undefined) {
    this._createTime = value
  }

  public toJSON() {
    return {
      id: this._id,
      text: this._text,
      createTime: this._createTime
    }
  }
}
