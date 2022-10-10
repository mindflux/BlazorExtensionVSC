const os = require('os');
const lf = os.EOL;

let templateFiles = {
    "templatedComponentRazor": getTemplatedComponentRazor("TemplatedComponent"),
    "templatedComponentCodebehind": getTemplatedComponentCodebehind("TemplatedComponent", "BlazorExtension")
};

export function getTemplatedComponentRazor(componentName: string): string {
    return `<h3>${componentName}</h3>${lf}${lf}@code {${lf}${lf}}`;
}

export function getTemplatedComponentCodebehind(componentName: string, namespace: string): string {
    var result = `using Microsoft.AspNetCore.Components;${lf}using System;${lf}using System.Collections.Generic;${lf}using System.Linq;${lf}`;
    result += `using System.Threading.Tasks;${lf}${lf}`;
    result += `namespace ${namespace}${lf}{${lf}\tpublic partial class ${componentName} : ComponentBase${lf}\t{${lf}\t}${lf}}`;

    return result;
}