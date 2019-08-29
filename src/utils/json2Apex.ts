/**
 * @file JSON to Apex
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as _ from "lodash";

export default class JSONConverter {
    private classes: string[];
    public snippet!: string;
    private scope = "public";

    constructor(options?: any) {
        this.classes = [];

        if (options && options.scope) {
            this.scope = options.scope;
        }
    }

    private addParser(name: string) {
        let parser = `${this.scope} static ${name} parse(String jsonStr) {` +
            `\n\treturn (${name})JSON.deserialize(jsonStr, ${name}.class);` +
        '\n}';

        this.classes.push(parser);
    }

    public addTestMethod(jsonStr: string) {
        let testMethod = `static testMethod void testParser() {
            String json = ${jsonStr};
            JSON2Apex obj = parse(json);
            System.assert(obj != null);
        }`;

        this.classes.push(testMethod);
    }

    public convertToApex(name: string, jsonObj: any, level=0) {
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