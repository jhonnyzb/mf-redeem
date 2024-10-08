import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ServersService } from "./http/server.service";
import { HttpCacheService } from "./http/httpcache.service";
import { environment } from "src/environments/environment";
import { HttpStatusCode } from "@angular/common/http";
import { OrderService } from "./order.service";
import { Error } from "../models/programs";


fdescribe('OrderService', () => {
    let orderService: OrderService;
    let httpController: HttpTestingController;
    let httpCacheService: HttpCacheService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                OrderService,
                ServersService,
                HttpCacheService
            ]
        });

        orderService = TestBed.inject(OrderService);
        httpController = TestBed.inject(HttpTestingController);
        httpCacheService = TestBed.inject(HttpCacheService);
    });

    afterEach(() => {
        httpController.verify();
    });

    it('should be created', () => {
        expect(orderService).toBeTruthy();
    });

    describe('Method getMissions', () => {

        it('should send a redeem product', () => {

            const dataRedeem = {
                IDCuenta: 123456,
                IDPremios_Cantidades: 1,
                Observaciones: "",
                NroFacturaExterna: "",
                NroReserva: "",
                Fecha: "",
                CodigoProductoExterno: "",
                IDMoneda: 0,
                MontoPuntos: 100,
                MontoPagadoEnMoneda: 0,
                MontoImpuestos: 0,
                MontoTotal: 0,
                MontoBaseMargenValemas: 0,
                MontoMargenValemas: 0,
                EsPedidoConfirmado: true,
                IDDireccion: 12345,
                IDGamificationReg: 0,
                IDContacto: 0,
                CodigoDeAutorizacion: "",
            };

            const mockResponse: Error = {
                IDCodigo: 0,
                Mensaje: 'Sin errores'
            }

            orderService.redeemProducts(dataRedeem,
                (data) => {
                    expect(data).toBe(mockResponse);
                }, (error : HttpErrorResponse) => { });

            const url = `${environment.serverName}v1/redenciones`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });

        it('should return any error code', () => {

            const dataRedeem = {
                IDCuenta: 123456,
                IDPremios_Cantidades: 1,
                Observaciones: "",
                NroFacturaExterna: "",
                NroReserva: "",
                Fecha: "",
                CodigoProductoExterno: "",
                IDMoneda: 0,
                MontoPuntos: 100,
                MontoPagadoEnMoneda: 0,
                MontoImpuestos: 0,
                MontoTotal: 0,
                MontoBaseMargenValemas: 0,
                MontoMargenValemas: 0,
                EsPedidoConfirmado: true,
                IDDireccion: 12345,
                IDGamificationReg: 0,
                IDContacto: 0,
                CodigoDeAutorizacion: "",
            };


            const errorMessage = 'Internal Server Error';
            const mockResponse = {
                status: HttpStatusCode.NotFound,
                statusText: errorMessage
            }

            orderService.redeemProducts(dataRedeem,
                (data) => { },
                (error : HttpErrorResponse) => {
                    expect(error).toBe(mockResponse);
                }
            );

            const url = `${environment.serverName}v1/redenciones`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });

    });
});
