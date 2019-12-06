/**
 * @file convert json to Apex
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as _ from "lodash";
import * as util from "./util";

// Used in convertJSON2Table
let excludeColumns = ["urls", "attributes"];

/**
 * Convert json array to table
 * 
 * @param jsonArray json object array to be converted to table
 * @returns string format of table content
 */
export function convertArrayToTable(jsonArray: any[], soql: string) {
    if (!jsonArray || jsonArray.length === 0) {
        return 'No Elements';
    }

    let columns: string[] = [];
    if (/select\s+\*\s+from[\s\t]+\w+/gi.test(soql)) {
        for (const key of _.keys(jsonArray[0])) {
            // Ignore excluded columns
            if (!excludeColumns.includes(key)) {
                columns.push(key);
            }
        }
    }
    else {
        columns = util.getSOQLFields(soql);
    }

    let tableContent = columns.join(',') + '\n';
    for (const element of jsonArray) {
        let values = [];
        for (const column of columns) {
            let rowValue = element;
            for (const _column of column.split('.')) {
                let fieldCaseMapping: any = {};
                for (const k of _.keys(rowValue)) {
                    fieldCaseMapping[k.toLowerCase()] = k;
                }

                rowValue = rowValue[fieldCaseMapping[_column.toLowerCase()]];
                if (!_.isObject(rowValue)) {
                    break;
                }
            }

            let value: string = rowValue || '';
            value = value.replace('"', '""');
            values.push(`"${value}"`);
        }

        tableContent += values.join(',') + '\n';
    }

    return tableContent;
}

export class JSON2Apex {
    private classes: string[];
    public snippet!: string;
    private scope = "public";

    /**
     * Get instance of converter
     * 
     * @param options options, {scope: public | global}
     */
    constructor(options?: any) {
        this.classes = [];

        if (options && options.scope) {
            this.scope = options.scope;
        }
    }

    // Add Json parser
    private addParser(name: string) {
        let parser = `${this.scope} static ${name} parse(String jsonStr) {` +
            `\n\treturn (${name})JSON.deserialize(jsonStr, ${name}.class);` +
            '\n}';

        this.classes.push(parser);
    }

    /**
     * Add testMethod for class
     * 
     * @param jsonStr json string to be converted
     */
    public addTestMethod(jsonStr: string) {
        let testMethod = `static testMethod void testParser() {
            String json = ${jsonStr};
            JSON2Apex obj = parse(json);
            System.assert(obj != null);
        }`;

        this.classes.push(testMethod);
    }

    /**
     * Set converted snippet
     * 
     * @param name class name
     * @param jsonObj json object, it can be object or array of object
     * @param level convertion level
     */
    public convertToApex(name: string, jsonObj: any, level = 0) {
        if (_.isArray(jsonObj)) {
            if (jsonObj.length === 0) {
                this.classes.push(`${this.scope} class ${name} {\n\n}\n`);
                this.snippet = this.classes.join("\n");
                return this;
            }
            else {
                jsonObj = jsonObj[0];
            }
        }

        if (_.isObject(jsonObj)) {
            let statements: string[] = [];
            _.map(jsonObj, (value, key) => {
                let dataType = "String";
                if (_.isString(value)) {
                    if (/\d{4}-\d{2}-\d{2}T[\d:Z.]+/i.test(value)) {
                        dataType = "DateTime";
                    }
                    else if (/\d{4}-\d{2}-\d{2}/.test(value)) {
                        dataType = "Date";
                    }
                }
                else if (_.isInteger(value)) {
                    dataType = "Integer";
                }
                else if (_.isBoolean(value)) {
                    dataType = "Boolean";
                }
                else if (_.isNumber(value)) {
                    dataType = "Decimal";
                }
                else if (_.isUndefined(value) || _.isNull(value)) {
                    dataType = "Object";
                }

                if (_.isArray(value)) {
                    statements.push(`\t${this.scope} List<${_.upperFirst(key)}> ${key};`);
                    if (!jsonObj[key]) {
                        this.classes.push(`${this.scope} class ${_.upperFirst(key)} {\n\n}\n`);
                    }
                    else {
                        this.convertToApex(_.upperFirst(key), jsonObj[key][0], 1);
                    }
                }
                else if (_.isObject(value)) {
                    statements.push(`\t${this.scope} ${_.upperFirst(key)} ${key};`);
                    this.convertToApex(_.upperFirst(key), jsonObj[key], 1);
                }
                else {
                    statements.push(`\t${this.scope} ${dataType} ${key};`);
                }
            });

            let _class = `${this.scope} class ${name} ` +
                `{\n${statements.join("\n")}\n}\n`;

            if (!this.classes.includes(_class)) {
                this.classes.push(_class);
            }

            if (level === 0) {
                this.addParser(name);
                this.snippet = this.classes.join("\n");
            }
        }

        return this;
    }
}

export class JSON2Typescript {
    private classes: string[];
    public snippet!: string;
    private scope = "export";

    /**
     * Get instance of converter
     * 
     * @param options options, {scope: export}
     */
    constructor(options?: any) {
        this.classes = [];

        if (options && options.scope) {
            this.scope = options.scope;
        }
    }

    /**
     * Set converted snippet
     * 
     * @param name class name
     * @param jsonObj json object, it can be object or array of object
     * @param level convertion level
     */
    public convertToTypescript(name: string, jsonObj: any, level = 0) {
        if (_.isArray(jsonObj)) {
            if (jsonObj.length === 0) {
                this.classes.push(`${this.scope} interface ${name} {\n\n}\n`);
                this.snippet = this.classes.join("\n");
                return this;
            }
            else {
                jsonObj = jsonObj[0];
            }
        }

        if (_.isObject(jsonObj)) {
            let statements: string[] = [];
            _.map(jsonObj, (value, key) => {
                let dataType = "string";
                if (_.isInteger(value) || _.isNumber(value)) {
                    dataType = "number";
                }
                else if (_.isBoolean(value)) {
                    dataType = "boolean";
                }
                else if (_.isUndefined(value) || _.isNull(value)) {
                    dataType = "Object | undefined";
                }

                if (_.isArray(value)) {
                    statements.push(`\t${key}: ${_.upperFirst(key)}[];`);
                    if (!jsonObj[key]) {
                        this.classes.push(`${this.scope} interface ${_.upperFirst(key)} {\n\n}\n`);
                    }
                    else {
                        this.convertToTypescript(_.upperFirst(key), jsonObj[key][0], 1);
                    }
                }
                else if (_.isObject(value)) {
                    statements.push(`\t${key}: ${_.upperFirst(key)};`);
                    this.convertToTypescript(_.upperFirst(key), jsonObj[key], 1);
                }
                else {
                    statements.push(`\t${key}: ${dataType};`);
                }
            });

            let _class = `${this.scope} interface ${name} ` +
                `{\n${statements.join("\n")}\n}\n`;

            if (!this.classes.includes(_class)) {
                this.classes.push(_class);
            }

            if (level === 0) {
                this.snippet = this.classes.join("\n");
            }
        }

        return this;
    }
}
