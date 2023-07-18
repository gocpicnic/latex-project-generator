import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Uri } from 'vscode';
import { VSCodeUI } from './vscode-ui';

export class Project {
    private context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    async copyFiles({ type,name, location }: { type:string,name: string; location: string; }) {
        try {
            const indexPath = path.join(this.context.extensionPath, 'templates', type,'index.tex');
            const bibfilePath = path.join(this.context.extensionPath, 'templates', type,'bibfile.bib');
            const cleanPath = path.join(this.context.extensionPath, 'templates', type,'clean.sh');
            const chaptersPath=path.join(this.context.extensionPath, 'templates', type,'Chapters');

            fs.copySync(indexPath,path.join(location,`${name}.tex`));
            fs.copySync(bibfilePath,path.join(location,'bibfile.bib'));
            fs.copySync(cleanPath,path.join(location,'clean.sh'));

            fs.copySync(chaptersPath,path.join(location,'Chapters'));


        } catch (err) {
            console.error(err);
        }
    }



    async createProject(type: string) {
        const result: Uri = await VSCodeUI.openDialogForFolder();
        console.log(result.fsPath);
        const projectName = path.parse(result.fsPath).name;
        if (result && result.fsPath) {
            await vscode.commands.executeCommand('vscode.openFolder', result);
            await this.copyFiles({ type,name:projectName, location: result.fsPath });
        }
    }
}
