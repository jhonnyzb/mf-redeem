import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { UserService } from "./user.service";
import { TestBed } from "@angular/core/testing";
import { ServersService } from "./http/server.service";
import { HttpCacheService } from "./http/httpcache.service";
import { UserLoginRequest } from "../models/Request/user-login-request";
import { environment } from "src/environments/environment";
import { generateUserLoginResponse } from "../mocks/userMocks/mockUserService";
import { UserLoginResponse } from "../models/Response/user-login-response";
import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { CodeValidate } from "../models/code-validate-model";
import { generateAccount } from "../mocks/userMocks/mockAccount";
import { UserUtils } from "../utils/UserUtils";
import { generatePersonInfo } from "../mocks/userMocks/mockPersonInfo";
import { ChangePasswordModel } from "../models/Request/change-password-request";
import { ChangePassword } from "../models/change-password.model";
import { Error } from "../models/Response/error";
import { PersonaPopup } from "../models/Request/validateFomrRequest";


fdescribe('UserService', () => {
    let userService: UserService;
    let httpController: HttpTestingController;
    let httpCacheService: HttpCacheService;

    let userUtilsStub: Partial<UserUtils>;

    beforeEach(() => {
        userUtilsStub = {
            // Aquí puedes proporcionar cualquier método que necesite tu componente
            getUserLogin(): UserLoginResponse {
                return generateUserLoginResponse()
            }
        };
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                UserService,
                ServersService,
                HttpCacheService
            ]
        });

        userService = TestBed.inject(UserService);
        httpController = TestBed.inject(HttpTestingController);
        httpCacheService = TestBed.inject(HttpCacheService);
    });

    afterEach(() => {
        httpController.verify();
    });

    it('should be created', () => {
        expect(userService).toBeTruthy();
    });

    describe('Login user service', () => {

        it('should return a login mock', () => {
            const userLogin: UserLoginRequest = {
                IdPrograma: 6,
                IdRole: 11,
                IDTipoEquipoOrigen: environment.sourceId,
                UserName: 'test',
                Password: 'password'
            };

            const mockResponse = generateUserLoginResponse();

            userService.login(userLogin).subscribe({
                next: (data: UserLoginresponse : any) => {
                    expect(data).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/usuarios/login/afiliado`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {
            const userLogin: UserLoginRequest = {
                IdPrograma: 6,
                IdRole: 11,
                IDTipoEquipoOrigen: environment.sourceId,
                UserName: 'test',
                Password: 'password'
            };

            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            userService.login(userLogin).subscribe({
                error: (error : HttpErrorResponse) => {
                    expect(error).toEqual('Algo esta fallando en el servidor');
                }
            });

            const url = `${environment.serverName}v1/usuarios/login/afiliado`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(errorMessage, mockResponse);
        });

        it('should return any error code', () => {
            const userLogin: UserLoginRequest = {
                IdPrograma: 6,
                IdRole: 11,
                IDTipoEquipoOrigen: environment.sourceId,
                UserName: 'test',
                Password: 'password'
            };

            const errorMessage = 'No encontrado';

            const mockResponse = {
                status: HttpStatusCode.NotFound,
                statusText: errorMessage
            }

            userService.login(userLogin).subscribe({
                error: (error: HttpErrorResponse) => {
                    expect(error.error).toEqual(mockResponse.statusText);
                    expect(error.status).toEqual(mockResponse.status);
                }
            });

            const url = `${environment.serverName}v1/usuarios/login/afiliado`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(errorMessage, mockResponse);
        });
    });

    describe('exists method', () => {
        it('should return null', () => {
            expect(userService.exists()).toBeNull();
        });

        it('should return data', () => {
            const userInfoResponse = generatePersonInfo();
            sessionStorage.setItem('user', JSON.stringify(userInfoResponse));
            expect(userService.exists()).toBe(JSON.stringify(userInfoResponse));
            sessionStorage.clear();
        });
    });

    describe('Generate code method', () => {

        it('should return a code model response', () => {
            const codeValidate: CodeValidate = {
                IdPrograma: 6,
                IdPersona: 161616,
                IdCuenta: 151515,
                IdConcepto: 11,
                IdTypeNotification: 49,
                Codigo: null,
                ContactData: null,
                Username: '',
                SourceTypeId: environment.sourceId
            };

            const mockResponse = {
                "Code": 0,
                "Message": "Por favor consulte su correo o celular registrado, hemos enviado las instrucciones para continuar el proceso. ",
                "Data": true
            }

            userService.generateCode(codeValidate).subscribe({
                next: (data: any) => {
                    expect(data).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/authorize/generate`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {
            const codeValidate: CodeValidate = {
                IdPrograma: 6,
                IdPersona: 161616,
                IdCuenta: 151515,
                IdConcepto: 11,
                IdTypeNotification: 49,
                Codigo: null,
                ContactData: null,
                Username: '',
                SourceTypeId: environment.sourceId
            };

            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            userService.generateCode(codeValidate).subscribe({
                error: (error : HttpErrorResponse) => {
                    expect(error).toEqual('Algo esta fallando en el servidor');
                }
            });

            const url = `${environment.serverName}v1/authorize/generate`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(errorMessage, mockResponse);
        });

        it('should return any error code', () => {
            const codeValidate: CodeValidate = {
                IdPrograma: 6,
                IdPersona: 161616,
                IdCuenta: 151515,
                IdConcepto: 11,
                IdTypeNotification: 49,
                Codigo: null,
                ContactData: null,
                Username: '',
                SourceTypeId: environment.sourceId
            };

            const errorMessage = 'UnAuthorized';

            const mockResponse = {
                status: HttpStatusCode.Unauthorized,
                statusText: errorMessage
            }

            userService.generateCode(codeValidate).subscribe({
                error: (error: HttpErrorResponse) => {
                    expect(error.error).toEqual(mockResponse.statusText);
                    expect(error.status).toEqual(mockResponse.status);
                }
            });

            const url = `${environment.serverName}v1/authorize/generate`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(errorMessage, mockResponse);
        });
    });

    describe('Validate code method', () => {

        it('should return a code model response', () => {
            const codeValidate: CodeValidate = {
                IdPrograma: 6,
                IdPersona: 161616,
                IdCuenta: 151515,
                IdConcepto: 11,
                IdTypeNotification: 49,
                Codigo: '123456',
                ContactData: null,
                Username: '',
                SourceTypeId: environment.sourceId
            };

            const mockResponse = {
                Code: 0,
                Data: true,
                Message: "Registro actualizado Exitosamente"
            }

            userService.validateCode(codeValidate).subscribe({
                next: (data: any) => {
                    expect(data).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/authorize/validate`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {
            const codeValidate: CodeValidate = {
                IdPrograma: 6,
                IdPersona: 161616,
                IdCuenta: 151515,
                IdConcepto: 11,
                IdTypeNotification: 49,
                Codigo: '123456',
                ContactData: null,
                Username: '',
                SourceTypeId: environment.sourceId
            };

            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            userService.validateCode(codeValidate).subscribe({
                error: (error : HttpErrorResponse) => {
                    expect(error).toEqual('Algo esta fallando en el servidor');
                }
            });

            const url = `${environment.serverName}v1/authorize/validate`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(errorMessage, mockResponse);
        });

        it('should return any error code', () => {
            const codeValidate: CodeValidate = {
                IdPrograma: 6,
                IdPersona: 161616,
                IdCuenta: 151515,
                IdConcepto: 11,
                IdTypeNotification: 49,
                Codigo: '123456',
                ContactData: null,
                Username: '',
                SourceTypeId: environment.sourceId
            };

            const errorMessage = 'UnAuthorized';

            const mockResponse = {
                status: HttpStatusCode.Unauthorized,
                statusText: errorMessage
            }

            userService.validateCode(codeValidate).subscribe({
                error: (error: HttpErrorResponse) => {
                    expect(error.error).toEqual(mockResponse.statusText);
                    expect(error.status).toEqual(mockResponse.status);
                }
            });

            const url = `${environment.serverName}v1/authorize/validate`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(errorMessage, mockResponse);
        });
    });

    describe('changePassword method', () => {

        it('should return a changePassword model response', () => {
            const mockData: ChangePassword = {
                UserName: 'test',
                VerifyCode: '123456',
                NewPassword: 'password',
                NewPasswordVerified: 'password',
                SourceTypeId: environment.sourceId,
                ProgramId: 6
            };
            const mockResponse = {
                Code: 0,
                Data: true,
                Message: "Registro actualizado Exitosamente"
            }

            userService.changePassword(mockData).subscribe({
                next: (data: any) => {
                    expect(data).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/users/change-password`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {

            const mockData: ChangePassword = {
                UserName: 'test',
                VerifyCode: '123456',
                NewPassword: 'password',
                NewPasswordVerified: 'password',
                SourceTypeId: environment.sourceId,
                ProgramId: 6
            };
            const errorMessage = 'Internal Server Error';
            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            userService.changePassword(mockData).subscribe({
                error: (error : HttpErrorResponse) => {
                    expect(error).toEqual('Algo esta fallando en el servidor');
                }
            });

            const url = `${environment.serverName}v1/users/change-password`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(errorMessage, mockResponse);
        });

        it('should return any error code', () => {
            const mockData: ChangePassword = {
                UserName: 'test',
                VerifyCode: '123456',
                NewPassword: 'password',
                NewPasswordVerified: 'password',
                SourceTypeId: environment.sourceId,
                ProgramId: 6
            };
            const errorMessage = 'UnAuthorized';
            const mockResponse = {
                status: HttpStatusCode.Unauthorized,
                statusText: errorMessage
            }

            userService.changePassword(mockData).subscribe({
                error: (error: HttpErrorResponse) => {
                    expect(error.error).toEqual(mockResponse.statusText);
                    expect(error.status).toEqual(mockResponse.status);
                }
            });

            const url = `${environment.serverName}v1/users/change-password`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(errorMessage, mockResponse);
        });
    });

    describe('changePasswordAccount method', () => {

        it('should return a changePasswordAccount model response', () => {
            const codeValidate: ChangePasswordModel = {
                Usuario: 'test',
                Password: 'passwordold',
                NewPassword: 'password',
                NewPasswordVerified: 'password',
                IDPrograma: 6,
                IDTipoEquipoOrigen: environment.sourceId
            };

            const mockResponse = {
                Code: 0,
                Data: true,
                Message: "Registro actualizado Exitosamente"
            }

            userService.changePasswordAccount(codeValidate).subscribe({
                next: (data: any) => {
                    expect(data).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/usuarios/modificarClave`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {
            const codeValidate: ChangePasswordModel = {
                Usuario: 'test',
                Password: 'passwordold',
                NewPassword: 'password',
                NewPasswordVerified: 'password',
                IDPrograma: 6,
                IDTipoEquipoOrigen: environment.sourceId
            };

            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            userService.changePasswordAccount(codeValidate).subscribe({
                error: (error : HttpErrorResponse) => {
                    expect(error).toEqual('Algo esta fallando en el servidor');
                }
            });

            const url = `${environment.serverName}v1/usuarios/modificarClave`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(errorMessage, mockResponse);
        });

        it('should return any error code', () => {
            const codeValidate: ChangePasswordModel = {
                Usuario: 'test',
                Password: 'passwordold',
                NewPassword: 'password',
                NewPasswordVerified: 'password',
                IDPrograma: 6,
                IDTipoEquipoOrigen: environment.sourceId
            };

            const errorMessage = 'UnAuthorized';

            const mockResponse = {
                status: HttpStatusCode.Unauthorized,
                statusText: errorMessage
            }

            userService.changePasswordAccount(codeValidate).subscribe({
                error: (error: HttpErrorResponse) => {
                    expect(error.error).toEqual(mockResponse.statusText);
                    expect(error.status).toEqual(mockResponse.status);
                }
            });

            const url = `${environment.serverName}v1/usuarios/modificarClave`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(errorMessage, mockResponse);
        });
    });

    describe('updateInformation method', () => {

        it('should return a updateInformation response model', () => {

            const mockRequestData = {
                IDPersona: 123645,
                IDCuenta: 123465,
                IDPrograma: 6,
                Indicativo: "+57",
                IDTipoIdentificacion: 1,
                NumeroIdentificacion: '123456789',
                Nombres: 'pruebas',
                Apellidos: 'pruebas',
                IDPaisExpedicionIdentificacion: 57,
                TelefonoMovil: "3211111111",
                email: 'email@email.com',
                Codigo: "",
                Pais: 0
            }
            const error: Error = {
                IDCodigo: 0,
                Mensaje: 'Sin errores'
            }

            const mockResponse = {
                IDCodigo: 0,
                Mensaje: 'Sin errores',
                Errores: [error]
            }

            userService.updateInformation(mockRequestData,
                (response : any) => {
                    expect(response).toBe(mockResponse);
                }, (error : HttpErrorResponse) => { });

            const url = `${environment.serverName}v1/personas/actualizainfo`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toEqual('POST');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {
            const mockRequestData = {
                IDPersona: 123645,
                IDCuenta: 123465,
                IDPrograma: 6,
                Indicativo: "+57",
                IDTipoIdentificacion: 1,
                NumeroIdentificacion: '123456789',
                Nombres: 'pruebas',
                Apellidos: 'pruebas',
                IDPaisExpedicionIdentificacion: 57,
                TelefonoMovil: "3211111111",
                email: 'email@email.com',
                Codigo: "",
                Pais: 0
            }

            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            userService.updateInformation(mockRequestData, null,
                (error : HttpErrorResponse) => {
                    expect(error).toEqual('Internal Server Error');
                }
            );

            const url = `${environment.serverName}v1/personas/actualizainfo`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('POST');
            req.flush(errorMessage, mockResponse);
        });
    });

    describe('getInformation method', () => {

        it('should return a getInformation model', () => {
            const userInfoResponse = generatePersonInfo();
            userInfoResponse.IDpersona = 123456;

            const personId = userInfoResponse.IDpersona;

            userService.getInformation(personId,
                (response : any) => {
                    expect(response.IDpersona).toBe(personId);
                }, (error : HttpErrorResponse) => { });

            const url = `${environment.serverName}v1/personas/${personId}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toEqual('GET');
            req.flush(userInfoResponse);
        });

        it('should return error status 500', () => {
            const personId = 123456;

            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            userService.getInformation(personId, null,
                (error : HttpErrorResponse) => {
                    expect(error).toEqual('Internal Server Error');
                }
            );

            const url = `${environment.serverName}v1/personas/${personId}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(errorMessage, mockResponse);
        });
    });

    describe('updatePersonPopup method', () => {

        it('should return a updatePersonPopup model response', () => {
            const mockRequest: PersonaPopup = {
                IDPersona: 123456,
                IDCuenta: 123456,
                IDPrograma: 6,
                IDDireccion: 123456,
                TelefonoCelular: '3211111111',
                Email: 'email@email.com',
                IDCiudad: 57101101,
                Barrio: 'el barrio',
                Direccion: 'la dirección',
                IDTipoEquipoOrigen: environment.sourceId,
                IDDepartamento: 'el departamento'
            };

            const mockResponse = {
                Code: 0,
                Data: true,
                Message: "Registro actualizado Exitosamente"
            }

            userService.updatePersonPopup(mockRequest).subscribe({
                next: (data: any) => {
                    expect(data).toBe(mockResponse);
                }
            });

            const url = `${environment.serverName}v1/personas/Actualizarpersonapopup`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('PUT');
            req.flush(mockResponse);
        });

        it('should return error status 500', () => {
            const mockRequest: PersonaPopup = {
                IDPersona: 123456,
                IDCuenta: 123456,
                IDPrograma: 6,
                IDDireccion: 123456,
                TelefonoCelular: '3211111111',
                Email: 'email@email.com',
                IDCiudad: 57101101,
                Barrio: 'el barrio',
                Direccion: 'la dirección',
                IDTipoEquipoOrigen: environment.sourceId,
                IDDepartamento: 'el departamento'
            };


            const errorMessage = 'Internal Server Error';

            const mockResponse = {
                status: HttpStatusCode.InternalServerError,
                statusText: errorMessage
            }

            userService.updatePersonPopup(mockRequest).subscribe({
                error: (error : HttpErrorResponse) => {
                    expect(error).toEqual('Algo esta fallando en el servidor');
                }
            });

            const url = `${environment.serverName}v1/personas/Actualizarpersonapopup`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('PUT');
            req.flush(errorMessage, mockResponse);
        });

        it('should return any error code', () => {
            const mockRequest: PersonaPopup = {
                IDPersona: 123456,
                IDCuenta: 123456,
                IDPrograma: 6,
                IDDireccion: 123456,
                TelefonoCelular: '3211111111',
                Email: 'email@email.com',
                IDCiudad: 57101101,
                Barrio: 'el barrio',
                Direccion: 'la dirección',
                IDTipoEquipoOrigen: environment.sourceId,
                IDDepartamento: 'el departamento'
            };

            const errorMessage = 'UnAuthorized';

            const mockResponse = {
                status: HttpStatusCode.Unauthorized,
                statusText: errorMessage
            }

            userService.updatePersonPopup(mockRequest).subscribe({
                error: (error: HttpErrorResponse) => {
                    expect(error.error).toEqual(mockResponse.statusText);
                    expect(error.status).toEqual(mockResponse.status);
                }
            });

            const url = `${environment.serverName}v1/personas/Actualizarpersonapopup`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toBe('PUT');
            req.flush(errorMessage, mockResponse);
        });
    });

});

