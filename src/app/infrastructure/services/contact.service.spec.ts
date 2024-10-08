import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ServersService } from "./http/server.service";
import { HttpCacheService } from "./http/httpcache.service";
import { environment } from "src/environments/environment";
import { HttpStatusCode } from "@angular/common/http";
import { ContactService } from "./contact.service";
import { Error } from "../models/programs";


fdescribe('ContactService', () => {
    let contactService: ContactService;
    let httpController: HttpTestingController;
    let httpCacheService: HttpCacheService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ContactService,
                ServersService,
                HttpCacheService
            ]
        });

        contactService = TestBed.inject(ContactService);
        httpController = TestBed.inject(HttpTestingController);
        httpCacheService = TestBed.inject(HttpCacheService);
    });

    afterEach(() => {
        httpController.verify();
    });

    it('should be created', () => {
        expect(contactService).toBeTruthy();
    });

    describe('Method getContacts', () => {

        it('should return a contacts list', () => {

            const programId = 123456;
            const mockResponse = {
                "Code": 0,
                "Message": "Registro actualizado Exitosamente",
                "Data": [
                    {
                        "IDContacto": 4649,
                        "IDCuenta": 123456,
                        "IDPrograma": 6,
                        "Correo": "prueba@valemas.com",
                        "Indicativo": "+57",
                        "Celular": "3201111111",
                        "Activo": true,
                        "Principal": false,
                        "FechaActualizacion": "2022-04-13T10:47:14.14"
                    }
                ]
            }

            contactService.getContacts(programId,
                (data) => {
                    expect(data).toBe(mockResponse);
                }, (error : HttpErrorResponse) => { });

            const url = `${environment.serverName}v1/contactos/cuenta/${programId}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should return any error code', () => {

            const programId = 123456;
            const errorMessage = 'Internal Server Error';
            const mockResponse = {
                status: HttpStatusCode.NotFound,
                statusText: errorMessage
            }

            contactService.getContacts(programId,
                (data) => { },
                (error : HttpErrorResponse) => {
                    expect(error).toBe(mockResponse);
                }
            );

            const url = `${environment.serverName}v1/contactos/cuenta/${programId}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

    });

    describe('Method getReason', () => {

        it('should return a reason list', () => {

            const mockResponse = [
                {
                    "IDTabla": 0,
                    "Codigo": "AMAZONAS",
                    "Descripcion": "AMAZONAS"
                },
                {
                    "IDTabla": 0,
                    "Codigo": "ANTIOQUIA",
                    "Descripcion": "ANTIOQUIA"
                },
                {
                    "IDTabla": 0,
                    "Codigo": "ARAUCA",
                    "Descripcion": "ARAUCA"
                }
            ];

            const conceptId = 62;
            const tableId = 62;
            const programId = 6;


            contactService.getReason(conceptId, tableId, programId).subscribe({
                next:(data) => {
                expect(data).toBe(mockResponse);
            }}
            );

            const url = `${environment.serverName}v1/configuraciones/tablas?idConcepto=${conceptId}&idTabla=${tableId}&idPrograma=${programId}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {

            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            const conceptId = 62;
            const tableId = 62;
            const programId = 6;
            contactService.getReason(conceptId, tableId, programId).subscribe({
                error: (error : HttpErrorResponse) => {
                    expect(error).toBe(mockResponse);
                }
            });


            const url = `${environment.serverName}v1/configuraciones/tablas?idConcepto=${conceptId}&idTabla=${tableId}&idPrograma=${programId}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should return any error code', () => {

            const errorMessage = 'No encontrado';

            const mockResponse = {
                status: HttpStatusCode.NotFound,
                statusText: errorMessage
            }


            const conceptId = 62;
            const tableId = 62;
            const programId = 6;


            contactService.getReason(conceptId, tableId, programId).subscribe({
                error: (error)=>
                {
                    expect(error).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/configuraciones/tablas?idConcepto=${conceptId}&idTabla=${tableId}&idPrograma=${programId}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('Method createTicket', () => {

        it('should return a reason list', () => {

            const mockResponse: Error = {
                IDCodigo: 0,
                Mensaje: 'Sin errores'
            };

            let data = {
                EventType: 1,
                Message: 'Mensaje',
              };

            contactService.createTicket(data).subscribe({
                next:(data) => {
                expect(data).toBe(mockResponse);
            }});

            const url = `${environment.serverName}v1/ticket/create`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {

            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            let data = {
                EventType: 1,
                Message: 'Mensaje',
              };

            contactService.createTicket(data).subscribe({
                error: (error : HttpErrorResponse) => {
                    expect(error).toBe(mockResponse);
                }
            });


            const url = `${environment.serverName}v1/ticket/create`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });

        it('should return any error code', () => {

            const errorMessage = 'No encontrado';

            const mockResponse = {
                status: HttpStatusCode.NotFound,
                statusText: errorMessage
            }


            let data = {
                EventType: 1,
                Message: 'Mensaje',
              };

            contactService.createTicket(data).subscribe({
                error: (error)=>
                {
                    expect(error).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/ticket/create`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });
    });




});

