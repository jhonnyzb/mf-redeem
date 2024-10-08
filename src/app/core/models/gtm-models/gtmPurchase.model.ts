export class GTMPurchase {
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
    public TransactionId: number,
    public Quantity: number,
    public ItemsID: string,
    public Currency: string,
    public valor: string
  ) {}
}

export class GTMValueOfPurchase {
  constructor(
    public Puntos: number,
    public Dinero: number
  ) {}
}
