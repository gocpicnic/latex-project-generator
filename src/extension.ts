import * as vscode from 'vscode';
import { Project } from './project';

export function activate(context: vscode.ExtensionContext) {
	const project = new Project(context);
    const createCTEXbookProjectCommand = vscode.commands.registerCommand('extension.createCTEXbookProject', () => {
        project.createProject('ctexbook')
            .catch(error => console.log(error));
    });

    context.subscriptions.push(createCTEXbookProjectCommand);
}

export function deactivate() {}
