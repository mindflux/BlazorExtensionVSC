import * as vscode from 'vscode';
import { getTemplatedComponentCodebehind, getTemplatedComponentRazor } from './templateFiles';
const fs = require("fs");
const path = require("path");
const currentOS = process.platform;

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('blazorextension.newBlazorComponent', async (fileUri) => {
			let componentNameNullable = await vscode.window.showInputBox({ "placeHolder": "Enter component name" });

			if (componentNameNullable === undefined) {
				vscode.window.showErrorMessage("Component was undefined");
				return;
			}

			let componentName: string = componentNameNullable;
			let filePath: string = fileUri.fsPath;

			var startChar = currentOS !== 'win32' ? 1 : filePath.indexOf(":") + 2; //strip off first forward slash for linux or drive letter : \ for windows

			filePath = filePath.substring(startChar);

			var delim = currentOS !== 'win32' ? '/' : '\\'; //linux v windows
			var pathArray = filePath.split(delim);

			//loop through array to uppercase each char of first segment 
			//old method wasn't working properly
			for (let i = 0; i < pathArray.length; i++) {
				pathArray[i] = pathArray[i].charAt(0).toUpperCase() + pathArray[i].slice(1);
			}

			filePath = pathArray.join('.');

			let namespaceNullable = await vscode.window.showInputBox({
				"placeHolder": "Enter namespace or clear field to stop creation of codebehind",
				"value": filePath
			});

			let folderPath = fileUri.fsPath;

			await createFile(folderPath, `${componentName}.razor`, getTemplatedComponentRazor(componentName));

			//only create codebehind if namespace is given
			if (namespaceNullable !== undefined && namespaceNullable.length > 0) {
				let namespace: string = namespaceNullable;
				await createFile(folderPath, `${componentName}.razor.cs`, getTemplatedComponentCodebehind(componentName, namespace));
			}

		})
	);
}

async function createFile(directoryPath: string, newFileName: string, content: string) {
	await fs.writeFile(path.join(directoryPath, newFileName), content, (err: any) => {
		if (err) {
			console.error(err);
			return vscode.window.showErrorMessage("Failed to create " + newFileName);
		}

		vscode.window.showInformationMessage("Created " + newFileName);
	});
}