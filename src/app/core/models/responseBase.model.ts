export class ResponseBase<T> {
  constructor(
    public codeId: number,
    public message: string,
    public data: T
  ) {}
}
