let templateFiles = {
    "templatedComponentRazor": getTemplatedComponentRazor("TemplatedComponent"),
    "templatedComponentCodebehind": getTemplatedComponentCodebehind("TemplatedComponent", "BlazorExtension")
};

export function getTemplatedComponentRazor(componentName : string): string {
    return `<h3>${componentName}</h3>

@code {

}
`;
}

export function getTemplatedComponentCodebehind(componentName : string, namespace : string): string {
    return `using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ${namespace}
{
    public partial class ${componentName} : ComponentBase
    {
    }
}
`;
}