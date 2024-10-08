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
import { ProductService } from "./product.service";
import { AwardsTax } from "../models/awardsTax";
import { AwardTax } from "../models/awardsTax";


fdescribe('ProductService', () => {
    let productService: ProductService;
    let httpController: HttpTestingController;
    let httpCacheService: HttpCacheService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ProductService,
                ServersService,
                HttpCacheService
            ]
        });

        productService = TestBed.inject(ProductService);
        httpController = TestBed.inject(HttpTestingController);
        httpCacheService = TestBed.inject(HttpCacheService);
    });

    afterEach(() => {
        httpController.verify();
    });

    it('should be created', () => {
        expect(productService).toBeTruthy();
    });

    describe('Method setFilterSearch, getFilterSearch ', () => {
        it('should be save in localStorage the filter', () => {
            productService.setFilterSearch('prueba');
            expect(productService.getFilterSearch()).toBe('prueba');
        });
    });

    describe('Method setSelectedProduct, getSelectedProduct ', () => {
        it('should be save in localStorage the filter', () => {
            productService.setSelectedProduct('prueba');
            expect(productService.getSelectedProduct()).toBe('prueba');
        });
    });

    describe('Method getFeaturedArticles', () => {

        it('should return a list of featured products', () => {

            const params = {
                idCuenta: 123456,
                idCluster: 123,
            };
            const mockResponse = {
                products: [{ id: 1, nombre: 'nombre' }]
            }

            productService.getFeaturedArticles(params,
                (data) => {
                    expect(data).toBe(mockResponse);
                },
                (error : HttpErrorResponse) => {
                });

            const url = `${environment.serverName}v2/catalogos/destacados${httpCacheService.objectToParams(params)}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should return any error code', () => {
            const params = {
                idCuenta: 123456,
                idCluster: 123,
            };

            const errorMessage = 'Internal Server Error';
            const mockResponse = {
                status: HttpStatusCode.NotFound,
                statusText: errorMessage
            }

            productService.getFeaturedArticles(params, (data) => { },
                (error : HttpErrorResponse) => {
                    expect(error).toBe(mockResponse);
                }
            );

            const url = `${environment.serverName}v2/catalogos/destacados${httpCacheService.objectToParams(params)}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

    });

    describe('Method getProductsByParams', () => {

        it('should return a list of products by params', () => {

            const params = {
                IDTipoCatalogo: -1,
                SeleccionarTodos: false,
                IDCategoria: -1,
                RegInicial: 1,
                PuntosDesde: 0,
                PuntosHasta: 999999999,
                Nombre: '',
                IDOrdenamientoNuevo: 1,
                IDPersona: 123456,
                IDCuenta: 123456,
                IDCatalogo: -1,
                IDPersonaUsuario: 123456,
                PermitePtosVariables: false,
                PermiteAlianzas: false,
            };


            const mockResponse = {
                products: [{ id: 1, nombre: 'nombre' }]
            }

            productService.getProductsByParams(params,
                (data) => {
                    expect(data).toBe(mockResponse);
                },
                (error : HttpErrorResponse) => {
                });

            const url = `${environment.serverName}v1/catalogos/premios${httpCacheService.objectToParams(params)}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should return any error code', () => {
            const params = {
                IDTipoCatalogo: -1,
                SeleccionarTodos: false,
                IDCategoria: -1,
                RegInicial: 1,
                PuntosDesde: 0,
                PuntosHasta: 999999999,
                Nombre: '',
                IDOrdenamientoNuevo: 1,
                IDPersona: 123456,
                IDCuenta: 123456,
                IDCatalogo: -1,
                IDPersonaUsuario: 123456,
                PermitePtosVariables: false,
                PermiteAlianzas: false,
            };

            const errorMessage = 'Internal Server Error';
            const mockResponse = {
                status: HttpStatusCode.NotFound,
                statusText: errorMessage
            }

            productService.getProductsByParams(params, (data) => { },
                (error : HttpErrorResponse) => {
                    expect(error).toBe(mockResponse);
                }
            );

            const url = `${environment.serverName}v1/catalogos/premios${httpCacheService.objectToParams(params)}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

    });

    describe('Method getProductsOrders', () => {

        it('should return a list of products orders', () => {

            const params = {
                RegInicial: 0,
                IDCuenta: 123456,
                cantidadProductos: 20
            };

            const mockResponse = {
                products: [{ id: 1, nombre: 'nombre' }]
            }

            productService.getProductsOrders(params,
                (data) => {
                    expect(data).toBe(mockResponse);
                },
                (error : HttpErrorResponse) => {
                });

            const url = `${environment.serverName}v1/cuentas/pedidos${httpCacheService.objectToParams(params)}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should return any error code', () => {
            const params = {
                RegInicial: 0,
                IDCuenta: 123456,
                cantidadProductos: 20
            };

            const errorMessage = 'Internal Server Error';
            const mockResponse = {
                status: HttpStatusCode.NotFound,
                statusText: errorMessage
            }

            productService.getProductsOrders(params, (data) => { },
                (error : HttpErrorResponse) => {
                    expect(error).toBe(mockResponse);
                }
            );

            const url = `${environment.serverName}v1/cuentas/pedidos${httpCacheService.objectToParams(params)}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

    });

    describe('Method getDetailOrders', () => {

        it('should return a list of products orders', () => {

            const orderId = 123456;

            const mockResponse = {
                products: [{ id: 1, nombre: 'nombre' }]
            }

            productService.getDetailOrders(orderId).subscribe({
                next: (data) => {
                    expect(data).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/cuentas/pedidoPremios?IDPedido=${orderId}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should return any error code', () => {

            const orderId = 123456;
            const errorMessage = 'Internal Server Error';
            const mockResponse = {
                status: HttpStatusCode.NotFound,
                statusText: errorMessage
            }

            productService.getDetailOrders(orderId).subscribe({
                error: (error : HttpErrorResponse) => {
                    expect(error).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/cuentas/pedidoPremios?IDPedido=${orderId}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

    });

    describe('Method getValueProducts', () => {

        it('should return a value of the awards', () => {

            const awards:  AwardTax = {
                Cantidad:2,
                IDCatalogo: 123,
                IDPremio: 123,
                PuntosUnidad:1
            }
            const requestMock:AwardsTax = {
                IDPunto: 10,
                Premios: [awards]
            };

            const mockResponse = {
                products: [{ id: 1, nombre: 'nombre' }]
            }

            productService.getValueProducts(requestMock).subscribe({
                next: (data) => {
                    expect(data).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/pagos/premios`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });

        it('should return any error code', () => {

            const awards:  AwardTax = {
                Cantidad:2,
                IDCatalogo: 123,
                IDPremio: 123,
                PuntosUnidad:1
            }
            const requestMock:AwardsTax = {
                IDPunto: 10,
                Premios: [awards]
            };

            const errorMessage = 'Internal Server Error';
            const mockResponse = {
                status: HttpStatusCode.NotFound,
                statusText: errorMessage
            }

            productService.getValueProducts(requestMock).subscribe({
                error: (error : HttpErrorResponse) => {
                    expect(error).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/pagos/premios`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });

    });
});
