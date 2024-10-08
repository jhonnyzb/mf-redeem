import { AwardDto, CreateOrderDtoModel } from "src/app/infrastructure/dto/request/createOrder.dto";
import { AwardRequestModel, CreateOrderRequestModel } from "../models/request/createOrder.model";
import { CalculateMixPayResponseModel } from "../models/response/calculateMixPayResponse.model";
import { CalculateMixPayResponseDto } from "src/app/infrastructure/dto/response/calculateMixPayResponse.dto";
import { AwardMixPayRequestDto, CalculateMixPayRequestDto } from "src/app/infrastructure/dto/request/calculateMixPay.dto";
import { AwardMixPayRequestModel, CalculateMixPayRequestModel } from "../models/request/calculateMixPay.model";
import { CreateOrderResponseDto, PaymentDto } from "src/app/infrastructure/dto/response/createOrderResponse.dto";
import { CreateOrderResponseModel, PaymentModel } from "../models/response/createOrderREsponse.model";

export class OrderMapper {
    static createFromDomainToApi(model: CreateOrderRequestModel): CreateOrderDtoModel {
        return {
            acceptData: model.acceptData,
            acceptTermsAndConditions: model.acceptTermsAndConditions,
            awards: OrderMapper.mapAwards(model.awards),
            isMixedPayment: model.isMixedPayment
        };

    }

    static mapAwards(awards: AwardRequestModel[]): AwardDto[] {
        return awards.map((award) => ({
            amount: award.amount,
            awardId: award.awardId,
            catalogueId: award.catalogueId,
            mobileOperator: award.mobileOperator,
        }));
    }

    static createFromApiToDomain(dto: CreateOrderResponseDto): CreateOrderResponseModel {
        return {
            orderId: dto.orderId,
            payment: OrderMapper.paymentFromApiToDomain(dto.payment)
        };

    }

    static paymentFromApiToDomain(dto: PaymentDto): PaymentModel {
        return {
            data: dto?.data,
            signature: dto?.signature
        }
    }
    static calculateMixPayFromApiToDomain(dto: CalculateMixPayResponseDto): CalculateMixPayResponseModel {
        return {
            totalValueInPoints: dto.totalValueInPoints,
            totalValueInMoney: dto.totalValueInMoney,
            currency: dto.currency
        };

    }
    static calculateMixPayFromDomainToApi(model: CalculateMixPayRequestModel): CalculateMixPayRequestDto {
        return {
            awards: OrderMapper.mixPayFromDomainToApi(model.awards)
        };

    }

    static mixPayFromDomainToApi(model: AwardMixPayRequestModel[]): AwardMixPayRequestDto[] {
        return model.map((award) => ({
            awardId: award.awardId,
            amount: award.amount
        }));

    }

}