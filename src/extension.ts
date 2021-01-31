import * as vscode from 'vscode';
import { getTemplatedComponentRazor, getTemplatedComponentCodebehind } from './templateFiles';
const fs = require("fs");
const path = require("path");

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

			for (let i = 0; i < filePath.length; i++) {
				if (i == 0) {
					filePath = filePath.replace("/", "");

					filePath[i + 1] == filePath[i + 1].toUpperCase();

					continue;
				}

				if (filePath[i] == '/') {
					filePath = filePath.replace("/", ".");

					filePath[i + 1] == filePath[i + 1].toUpperCase();
				}
			}

			let namespaceNullable = await vscode.window.showInputBox({
				"placeHolder": "Enter namespace",
				"value": filePath
			});

			if(namespaceNullable === undefined) {
				vscode.window.showErrorMessage("Namespace was null");
				return;
			}

			let namespace: string = namespaceNullable;

			let folderPath = fileUri.fsPath;

			await CreateFile(folderPath, `${componentName}.razor`, getTemplatedComponentRazor(componentName));
			await CreateFile(folderPath, `${componentName}.razor.cs`, getTemplatedComponentCodebehind(componentName, namespace));
		})
	);
}

async function CreateFile(directoryPath: string, newFileName: string, content: string) {
	await fs.writeFile(path.join(directoryPath, newFileName), content, (err: any) => {
		if (err) {
			console.error(err);
			return vscode.window.showErrorMessage("Failed to create " + newFileName);
		}

		vscode.window.showInformationMessage("Created " + newFileName);
	});
}