import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ServersService } from "./http/server.service";
import { HttpCacheService } from "./http/httpcache.service";
import { environment } from "src/environments/environment";
import { HttpStatusCode } from "@angular/common/http";
import { AddressService } from "./address.service";
import { generateAddressUserInfo } from "../mocks/addressMock/mockDireccionesResponse";
import { Error } from "../models/Response/error-response";


fdescribe('AddressService', () => {
    let addressService: AddressService;
    let httpController: HttpTestingController;
    let httpCacheService: HttpCacheService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AddressService,
                ServersService,
                HttpCacheService
            ]
        });

        addressService = TestBed.inject(AddressService);
        httpController = TestBed.inject(HttpTestingController);
        httpCacheService = TestBed.inject(HttpCacheService);
    });

    afterEach(() => {
        httpController.verify();
    });

    it('should be created', () => {
        expect(addressService).toBeTruthy();
    });

    describe('Method getCountries', () => {

        it('should return a countries list', () => {

            const mockResponse = [
                {
                    "IDTabla": 0,
                    "Codigo": "57",
                    "Descripcion1": "Colombia"
                },
                {
                    "IDTabla": 0,
                    "Codigo": "593",
                    "Descripcion1": "Ecuador"
                },
                {
                    "IDTabla": 0,
                    "Codigo": "51",
                    "Descripcion1": "Perú"
                }
            ];

            addressService.getCountries((data) => {
                expect(data).toBe(mockResponse);
            }, null
            );

            const url = `${environment.serverName}v1/direcciones/paises`;
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

            addressService.getCountries((data) => {
                expect(data).toBe(mockResponse);
            }, null
            );

            const url = `${environment.serverName}v1/direcciones/paises`;
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

            addressService.getCountries((data) => {
                expect(data).toBe(mockResponse);
            }, null
            );

            const url = `${environment.serverName}v1/direcciones/paises`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('Method getCitiesAndDepartaments', () => {

        it('should return a departments list', () => {

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

            const params = {
                idNivel: 1,
                idPais: 57,
                idCiudad: 1
            };

            addressService.getCitiesAndDepartaments(params, (data) => {
                expect(data).toBe(mockResponse);
            }, null
            );

            const url = `${environment.serverName}v1/direcciones/ciudades?idNivel=${params.idNivel}&idPais=${params.idPais}&idCiudad=${params.idCiudad}`;
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

            const params = {
                idNivel: 1,
                idPais: 57,
                idCiudad: 1
            };

            addressService.getCitiesAndDepartaments(params, (data) => {
                expect(data).toBe(mockResponse);
            }, null
            );

            const url = `${environment.serverName}v1/direcciones/ciudades?idNivel=${params.idNivel}&idPais=${params.idPais}&idCiudad=${params.idCiudad}`;
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

            const params = {
                idNivel: 1,
                idPais: 57,
                idCiudad: 1
            };

            addressService.getCitiesAndDepartaments(params, (data) => {
                expect(data).toBe(mockResponse);
            }, null
            );

            const url = `${environment.serverName}v1/direcciones/ciudades?idNivel=${params.idNivel}&idPais=${params.idPais}&idCiudad=${params.idCiudad}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('Method getCitiesAndDepartamentsNoCache', () => {

        it('should return a departments list', () => {

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

            const params = {
                idNivel: 1,
                idPais: 57,
                idCiudad: 1
            };

            addressService.getCitiesAndDepartamentsNoCache(params).subscribe({
                next: (data) => {
                    expect(data).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/direcciones/ciudades?idNivel=${params.idNivel}&idPais=${params.idPais}&idCiudad=${params.idCiudad}`;
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

            const params = {
                idNivel: 1,
                idPais: 57,
                idCiudad: 1
            };

            addressService.getCitiesAndDepartamentsNoCache(params).subscribe({
                next: (data) => {
                    expect(data).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/direcciones/ciudades?idNivel=${params.idNivel}&idPais=${params.idPais}&idCiudad=${params.idCiudad}`;
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

            const params = {
                idNivel: 1,
                idPais: 57,
                idCiudad: 1
            };

            addressService.getCitiesAndDepartamentsNoCache(params).subscribe({
                next: (data) => {
                    expect(data).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/direcciones/ciudades?idNivel=${params.idNivel}&idPais=${params.idPais}&idCiudad=${params.idCiudad}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('Method getAddressTypes', () => {

        it('should return a address types list', () => {

            const mockResponse = [
                {
                    "IDTabla": 14,
                    "Codigo": "1",
                    "Descripcion": "Residencia",
                    "SubCodigo": "DIRRESIDENCIAL"
                },
                {
                    "IDTabla": 14,
                    "Codigo": "2",
                    "Descripcion": "Negocio",
                    "SubCodigo": "DIRNEGOCIO"
                },
                {
                    "IDTabla": 14,
                    "Codigo": "12",
                    "Descripcion": "Otra",
                    "SubCodigo": "DIROTRA"
                }
            ];

            const params = {
                idPrograma: 6
            };

            addressService.getAddressTypes(params, (data) => {
                expect(data).toBe(mockResponse);
            }, null);

            const url = `${environment.serverName}v1/direcciones/tipos?idPrograma=${params.idPrograma}`;
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

            const params = {
                idPrograma: 6
            };

            addressService.getAddressTypes(params, (data) => {
                expect(data).toBe(mockResponse);
            }, null);

            const url = `${environment.serverName}v1/direcciones/tipos?idPrograma=${params.idPrograma}`;
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

            const params = {
                idPrograma: 6
            };

            addressService.getAddressTypes(params, (data) => {
                expect(data).toBe(mockResponse);
            }, null);

            const url = `${environment.serverName}v1/direcciones/tipos?idPrograma=${params.idPrograma}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('Method getAddress', () => {

        it('should return a address for user', () => {

            const mockResponse = generateAddressUserInfo();

            const accountId = 61166;
            addressService.getAddress(accountId, (data) => {
                expect(data).toBe(mockResponse);
            }, null);

            const url = `${environment.serverName}v1/direcciones/cuenta/${accountId}`;
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

            const accountId = 61166;
            addressService.getAddress(accountId, (data) => {
                expect(data).toBe(mockResponse);
            }, null);

            const url = `${environment.serverName}v1/direcciones/cuenta/${accountId}`;
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

            const accountId = 61166;
            addressService.getAddress(accountId, (data) => {
                expect(data).toBe(mockResponse);
            }, null);

            const url = `${environment.serverName}v1/direcciones/cuenta/${accountId}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('Method removeAddress', () => {

        it('should return a reponse ok when delete an address', () => {

            const mockRequest = generateAddressUserInfo();
            const mockResponse: Error = {
                IDCodigo: 0,
                Mensaje: 'Todo ok'
            }

            addressService.removeAddress(mockRequest, (data) => {
                expect(data).toBe(mockResponse);
            }, null);

            const url = `${environment.serverName}v1/direcciones`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('DELETE');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {

            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            const mockRequest = generateAddressUserInfo();
            addressService.removeAddress(mockRequest, (data) => {
                expect(data).toBe(mockResponse);
            }, null);

            const url = `${environment.serverName}v1/direcciones`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('DELETE');
            req.flush(mockResponse);
        });

        it('should return any error code', () => {

            const errorMessage = 'No encontrado';

            const mockResponse = {
                status: HttpStatusCode.NotFound,
                statusText: errorMessage
            }

            const mockRequest = generateAddressUserInfo();
            addressService.removeAddress(mockRequest, (data) => {
                expect(data).toBe(mockResponse);
            }, null);

            const url = `${environment.serverName}v1/direcciones`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('DELETE');
            req.flush(mockResponse);
        });
    });

    describe('Method updateAddress', () => {

        it('should return a updated address when update an address', () => {

            const mockResponse = generateAddressUserInfo();

            addressService.updateAddress(mockResponse, (data) => {
                expect(data).toBe(mockResponse);
            }, null);

            const url = `${environment.serverName}v1/direcciones`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('PUT');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {

            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            const mockRequest = generateAddressUserInfo();

            addressService.updateAddress(mockRequest, (data) => {
                expect(data).toBe(mockResponse);
            }, null);

            const url = `${environment.serverName}v1/direcciones`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('PUT');
            req.flush(mockResponse);
        });

        it('should return any error code', () => {

            const errorMessage = 'No encontrado';

            const mockResponse = {
                status: HttpStatusCode.NotFound,
                statusText: errorMessage
            }

            const mockRequest = generateAddressUserInfo();

            addressService.updateAddress(mockRequest, (data) => {
                expect(data).toBe(mockResponse);
            }, null);

            const url = `${environment.serverName}v1/direcciones`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('PUT');
            req.flush(mockResponse);
        });
    });

    describe('Method insertAddress', () => {

        it('should return a new address when create an address', () => {

            const mockResponse = generateAddressUserInfo();

            addressService.insertAddress(mockResponse, (data) => {
                expect(data).toBe(mockResponse);
            }, null);

            const url = `${environment.serverName}v1/direcciones`;
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

            const mockRequest = generateAddressUserInfo();

            addressService.insertAddress(mockRequest, (data) => {
                expect(data).toBe(mockResponse);
            }, null);

            const url = `${environment.serverName}v1/direcciones`;
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

            const mockRequest = generateAddressUserInfo();

            addressService.insertAddress(mockRequest, (data) => {
                expect(data).toBe(mockResponse);
            }, null);

            const url = `${environment.serverName}v1/direcciones`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });
    });

});

