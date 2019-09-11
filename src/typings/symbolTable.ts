export interface ApexClass {
    Id: string;
    NamespacePrefix: string;
    Name: string;
    SymbolTable: string;
    attributes: any;
    [propName: string]: any;
}