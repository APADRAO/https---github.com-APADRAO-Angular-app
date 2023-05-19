/* Calsse de Rotorno Padrão da API */
export abstract class ReturnBase {
    status: boolean = false;
    message: string = '';
    dados: any;
}