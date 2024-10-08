export class ProgramListModel {
  constructor(
    public programs: ProgramUrlModel[]
  ) {}
}

export class ProgramUrlModel {
  constructor(
    public url: string,
    public id: number
  ) {}
}
