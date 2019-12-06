export interface ApexClass {
    Id: string;
    NamespacePrefix: string;
    Name: string;
    SymbolTable: SymbolTable;
    attributes: any;
    [propName: string]: any;
}
export interface Location {
    column: number;
    line: number;
}

export interface Parameter {
    name: string;
    type: string;
}

export interface Annotation {
    name: string;
}

export interface Constructors {
    annotations: Annotation[];
    location: Location;
    modifiers: string[];
    name: string;
    parameters: Parameter[];
    references: any[];
    type: Object | undefined;
}

export interface Method {
    annotations: Annotation[];
    location: Location;
    modifiers: string[];
    name: string;
    parameters: Parameter[];
    references: any[];
    returnType: string;
    type: Object | undefined;
}

export interface Property {
    annotations: string[];
    location: Location;
    modifiers: string[];
    name: string;
    references: any[];
    type: string;
}

export interface TableDeclaration {
    annotations: string[];
    location: Location;
    modifiers: string[];
    name: string;
    references: any[];
    type: string;
}

export interface Variables {
    annotations: string[];
    location: Location;
    modifiers: string[];
    name: string;
    references: any[];
    type: string;
}

export interface InnerClass {
    constructors: Constructors[];
    externalReferences: any[];
    id: string;
    innerClasses: InnerClass[];
    interfaces: any[];
    methods: Method[];
    name: string;
    namespace: string;
    parentClass: string;
    property: Property[];
    tableDeclaration: TableDeclaration;
    variables: Variables[];
}

export interface SymbolTable {
    constructors: Constructors[];
    externalReferences: any[];
    id: string;
    innerClasses: InnerClass[];
    interfaces: any[];
    methods: Method[];
    name: string;
    namespace: string;
    parentClass: string;
    properties: Property[];
    tableDeclaration: TableDeclaration;
    variables: Variables[];
}
