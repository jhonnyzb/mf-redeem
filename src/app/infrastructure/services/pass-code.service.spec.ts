import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ServersService } from "./http/server.service";
import { HttpCacheService } from "./http/httpcache.service";
import { environment } from "src/environments/environment";
import { HttpStatusCode } from "@angular/common/http";
import { OrderService } from "./order.service";
import { PassCodeService } from "./pass-code.service";
import { CodeValidate } from "../models/code-validate-model";
import { GenerateCodeResponseModel } from "../models/Response/generateCodeResponse";


fdescribe('PassCodeService', () => {
    let passCodeServices: PassCodeService;
    let httpController: HttpTestingController;
    let httpCacheService: HttpCacheService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                PassCodeService,
                ServersService,
                HttpCacheService
            ]
        });

        passCodeServices = TestBed.inject(PassCodeService);
        httpController = TestBed.inject(HttpTestingController);
        httpCacheService = TestBed.inject(HttpCacheService);
    });

    afterEach(() => {
        httpController.verify();
    });

    it('should be created', () => {
        expect(passCodeServices).toBeTruthy();
    });

    describe('Method generateCode', () => {

        it('should return a responde for generate code', () => {

            const mockRequest: CodeValidate = {
                IdConcepto: 16,
                IdPrograma: 6,
                IdPersona: 654321,
                IdCuenta: 123456,
                IdTypeNotification: 46,
                SourceTypeId: environment.environmentId,
                Username: '',
                Codigo: '',
                ContactData: ''
            };

            const mockResponse: GenerateCodeResponseModel = {
                Data: true,
                Message: 'Sin errores',
                Code: 0
            }

            passCodeServices.generateCode(mockRequest).subscribe({
                next: (data) => {
                    expect(data).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/authorize/generate`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });

        it('should return any error code', () => {


            const mockRequest: CodeValidate = {
                IdConcepto: 16,
                IdPrograma: 6,
                IdPersona: 654321,
                IdCuenta: 123456,
                IdTypeNotification: 46,
                SourceTypeId: environment.environmentId,
                Username: '',
                Codigo: '',
                ContactData: ''
            };

            const errorMessage = 'Internal Server Error';
            const mockResponse = {
                status: HttpStatusCode.NotFound,
                statusText: errorMessage
            }

            passCodeServices.generateCode(mockRequest).subscribe({
                error: (error : HttpErrorResponse) => {
                    expect(error).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/authorize/generate`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });

    });

    describe('Method generateCode', () => {

        it('should return a responde for generate code', () => {

            const mockRequest: CodeValidate = {
                IdConcepto: 16,
                IdPrograma: 6,
                IdPersona: 654321,
                IdCuenta: 123456,
                IdTypeNotification: 46,
                SourceTypeId: environment.environmentId,
                Username: '',
                Codigo: '123456',
                ContactData: ''
            };

            const mockResponse: GenerateCodeResponseModel = {
                Data: true,
                Message: 'Sin errores',
                Code: 0
            }

            passCodeServices.validateCode(mockRequest).subscribe({
                next: (data) => {
                    expect(data).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/authorize/validate`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });

        it('should return any error code', () => {


            const mockRequest: CodeValidate = {
                IdConcepto: 16,
                IdPrograma: 6,
                IdPersona: 654321,
                IdCuenta: 123456,
                IdTypeNotification: 46,
                SourceTypeId: environment.environmentId,
                Username: '',
                Codigo: '123456',
                ContactData: ''
            };

            const errorMessage = 'Internal Server Error';
            const mockResponse = {
                status: HttpStatusCode.NotFound,
                statusText: errorMessage
            }

            passCodeServices.validateCode(mockRequest).subscribe({
                error: (error : HttpErrorResponse) => {
                    expect(error).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/authorize/validate`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });

    });
});
