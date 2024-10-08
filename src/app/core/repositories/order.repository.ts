import { Observable } from "rxjs";
import { CreateOrderRequestModel } from "../models/request/createOrder.model";
import { ResponseBase } from "../models/responseBase.model";
import { CalculateMixPayRequestModel } from "../models/request/calculateMixPay.model";
import { CalculateMixPayResponseModel } from "../models/response/calculateMixPayResponse.model";

export abstract class OrderRepository {
    abstract createOrder(data: CreateOrderRequestModel): Observable<ResponseBase<null>>
    abstract calculateMixPay(data: CalculateMixPayRequestModel): Observable<ResponseBase<CalculateMixPayResponseModel>>
}