import { footerResponse } from './../mocks/configMock/footer.mock';
import { HttpStatusCode } from "@angular/common/http";
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "src/environments/environment";
import { generateForm } from "../mocks/configMock/form.mock";
import { FormResponse } from "../models/Response/formResponse";
import { ConfigService } from "./config.service";
import { HttpCacheService } from "./http/httpcache.service";
import { ServersService } from "./http/server.service";
import { getConfigVisual } from '../mocks/configMock/visual.mock';


fdescribe('ConfigService', () => {
    let configService: ConfigService;
    let httpController: HttpTestingController;
    let httpCacheService: HttpCacheService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ConfigService,
                ServersService,
                HttpCacheService
            ]
        });
        configService = TestBed.inject(ConfigService);
        httpController = TestBed.inject(HttpTestingController);
        httpCacheService = TestBed.inject(HttpCacheService);
    });

    afterEach(() => {
        httpController.verify();
    });

    it('should be created', () => {
        expect(configService).toBeTruthy();
    });


    describe('getDocumentTypes service', () => {

        it('should return a list of document types', () => {
            const programId = 6;

            const mockResponse = [
                {
                    "IDTipoIdentificacion": 1,
                    "Nombre": "Cédula de Ciudadanía",
                    "NombreCorto": "CC"
                },
                {
                    "IDTipoIdentificacion": 2,
                    "Nombre": "Número de Identificación Tributaria",
                    "NombreCorto": "NIT"
                },
                {
                    "IDTipoIdentificacion": 3,
                    "Nombre": "Cédula de Extranjería",
                    "NombreCorto": "CE"
                },
                {
                    "IDTipoIdentificacion": 6,
                    "Nombre": "Pasaporte",
                    "NombreCorto": "PAS"
                }
            ];

            configService.getDocumentTypes(programId,
                (data) => {
                    expect(data).toBe(mockResponse);
                },
                (error : HttpErrorResponse) => { });


            const url = `${environment.serverName}v1/configuraciones/tiposIdentificacion?idPrograma=${programId}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {
            const programId = 6;

            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            configService.getDocumentTypes(programId, (data) => { },
                (error : HttpErrorResponse) => {
                    expect(error).toEqual('Algo esta fallando en el servidor');
                }
            );

            const url = `${environment.serverName}v1/configuraciones/tiposIdentificacion?idPrograma=${programId}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('getForm method service', () => {

        it('should return a form config', () => {
            const params = {
                formulario: 268,
                idPrograma: 6,
            };
            const mockResponse = generateForm();

            configService.getForm(params,
                (data: Formresponse : any) => {
                    expect(data).toBe(mockResponse);
                }, (error : HttpErrorResponse) => { }
            );

            const url = `${environment.serverName}v1/configuraciones/formulario?formulario=${params.formulario}&idPrograma=${params.idPrograma}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {
            const params = {
                formulario: 268,
                idPrograma: 6,
            };

            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            configService.getForm(params, (data) => { },
                (error : HttpErrorResponse) => {
                    expect(error).toEqual('Algo esta fallando en el servidor');
                }
            );

            const url = `${environment.serverName}v1/configuraciones/formulario?formulario=${params.formulario}&idPrograma=${params.idPrograma}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('getDataByTable method service', () => {

        it('should return a table list', () => {
            const params = {
                idConcepto: 52,
                idtabla: 252,
                idPrograma: 6
            };

            const mockResponse = [
                {
                    "IDTabla": 252,
                    "Codigo": "2",
                    "Descripcion": "Campaña genérica",
                    "SubCodigo": "CAM_DEFAULT"
                }
            ];

            configService.getDataByTable(params,
                (data) => {
                    expect(data).toBe(mockResponse);
                }, (error : HttpErrorResponse) => { }
            );
            const paramsData = httpCacheService.objectToParams(params);
            const url = `${environment.serverName}v1/configuraciones/tablas${paramsData}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {
            const params = {
                idConcepto: 52,
                idtabla: 252,
                idPrograma: 6
            };

            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            configService.getDataByTable(params, (data) => { },
                (error : HttpErrorResponse) => {
                    expect(error).toEqual('Algo esta fallando en el servidor');
                }
            );

            const paramsData = httpCacheService.objectToParams(params);
            const url = `${environment.serverName}v1/configuraciones/tablas${paramsData}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('getFooter method service', () => {

        it('should return a footer config', () => {
            let params = {
                ProgramId: 6
            };

            const mockResponse = footerResponse();

            configService.getFooter(params,
                (data) => {
                    expect(data).toBe(mockResponse);
                }, (error : HttpErrorResponse) => { }
            );

            const url = `${environment.serverName}v1/configuraciones/programa/${params.ProgramId}/footer`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {
            let params = {
                ProgramId: 6
            };


            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            configService.getFooter(params, (data) => { },
                (error : HttpErrorResponse) => {
                    expect(error).toEqual('Algo esta fallando en el servidor');
                }
            );

            const url = `${environment.serverName}v1/configuraciones/programa/${params.ProgramId}/footer`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('getIndicatives method service', () => {

        it('should return a indicatives list', () => {

            const mockResponse = [
                {
                    "IDPais": 1,
                    "Indicativo": "+1",
                    "Pais": "Estados Unidos",
                    "Abreviado": "US"
                },
                {
                    "IDPais": 7,
                    "Indicativo": "+7",
                    "Pais": "Rusia",
                    "Abreviado": "RU"
                }
            ];

            configService.getIndicatives(
                (data) => {
                    expect(data).toBe(mockResponse);
                }, (error : HttpErrorResponse) => { }
            );

            const url = `${environment.serverName}v1/configuraciones/indicativosPais`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {
            let params = {
                ProgramId: 6
            };


            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            configService.getIndicatives(
                (data) => { },
                (error : HttpErrorResponse) => {
                    expect(error).toEqual('Algo esta fallando en el servidor');
                }
            );

            const url = `${environment.serverName}v1/configuraciones/indicativosPais`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('getFormNoAuth method service', () => {

        it('should return a form config', () => {

            const formId = 268;
            const programId = 6;
            const mockResponse = generateForm();

            configService.getFormNoAuth(formId, programId).subscribe({
                next: (data: Formresponse : any) => {
                    expect(data).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/configuraciones/formulario?formulario=${formId}&idPrograma=${programId}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {
            const formId = 268;
            const programId = 6;

            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            configService.getFormNoAuth(formId, programId).subscribe({
                error: (error : HttpErrorResponse) => {
                    expect(error).toEqual('Algo esta fallando en el servidor');
                }
            });

            const url = `${environment.serverName}v1/configuraciones/formulario?formulario=${formId}&idPrograma=${programId}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('getConfigVisual method service', () => {

        it('should return a visual config', () => {
            const programId = 6;
            const mockResponse = getConfigVisual();

            configService.getConfigVisual(programId).subscribe({
                next: (data) => {
                    expect(data).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/configuraciones/programa/${programId}/configvisual`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {
            const programId = 6;
            const errorMessage = 'Internal Server Error';
            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            configService.getConfigVisual(programId).subscribe({
                error: (error : HttpErrorResponse) => {
                    expect(error).toEqual('Algo esta fallando en el servidor');
                }
            });

            const url = `${environment.serverName}v1/configuraciones/programa/${programId}/configvisual`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });
});
