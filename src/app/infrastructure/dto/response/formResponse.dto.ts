export interface FormPropertiesDto {
    Label: string;
    NombreCampo: string;
    TipoDato: string;
    Visible: boolean;
    Habilitado: boolean;
    Requerido: boolean;
    Longitud: number;
    Decimales: number;
    ExpresionRegular: string;
    IDGrupoInformacion: number;
    GrupoInformacion: string;
    VariableValefiel: string;
    Mensaje: string;
    Placeholder: string;
    EsDinamico: boolean;
    IDTabla: number;
}

export interface FormResponseDto {
    NumFormulario: number;
    NombreFormulario: string;
    Propiedades: FormPropertiesDto[];
}



