export class GTMSelectItem {
  constructor(
    public event: string,
    public ParameterTarget: string,
    public ParameterLocation: string,
    public ParameterType: string,
    public ParameterCategory: string,
    public IDAccount: number,
    public UserName: string,
    public IDProgram: number,
    public IDPerson: number,
    public item: string
  ) {}
}

export class GTMItemOfSelectItem {
  constructor(
    public Catalogo: number,
    public Categoria: string,
    public IDCategoria: number,
    public Id: number,
    public Nombre: string,
    public Precio: number,
    public Referencia: string
  ) {}
}
