export function parseNamespace(publicDeclarations: any) {
    let namespaces: any = {};
    for (const namespace in publicDeclarations) {
        if (publicDeclarations.hasOwnProperty(namespace)) {
            const classes: Object = publicDeclarations[namespace];
            namespaces[namespace] = Object.keys(classes);
        }
    }

    return namespaces;
} 