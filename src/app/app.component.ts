import { Component, OnInit, Inject } from '@angular/core';
import { VariableModel } from './variable.model';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  modelName = '';
  variables: VariableModel[] = [];
  result = '';
  typeList = ['Integer', 'String', 'Boolean'];
  copiedMessage = '';
  resultType = 'code';

  constructor(@Inject(DOCUMENT) private dom: Document) {

  }

  ngOnInit() {
    this.add();
  }

  add(): void {
    this.variables.push(new VariableModel(
      this.variables.length,
      '',
      'Integer',
      0,
      '',
      false,
      false
      )
    );
  }

  generateAngular(): void {
    this.resultType = 'code';
    this.copiedMessage = '';

    this.result = 'export class ' + this.underLine(this.titleCase(this.modelName)) + 'Model {\n';

    for (let i = 0; i < this.variables.length; i++) {
      this.result = this.result + '  ';
      this.result = this.result + this.underLine(this.variables[i].name) + ': ';
      if (this.variables[i].type === 'Integer') {
        this.result = this.result + 'number;';
      } else if (this.variables[i].type === 'String') {
        this.result = this.result + 'string;';
      } else  if (this.variables[i].type === 'Boolean') {
        this.result = this.result + 'boolean;';
      }
      this.result = this.result + '\n';
    }

    this.result = this.result + '  constructor(\n';

    for (let i = 0; i < this.variables.length; i++) {
      this.result = this.result + '    ';
      this.result = this.result + this.underLine(this.variables[i].name) + ': ';
      if (this.variables[i].type === 'Integer') {
        this.result = this.result + 'number';
      } else if (this.variables[i].type === 'String') {
        this.result = this.result + 'string';
      } else  if (this.variables[i].type === 'Boolean') {
        this.result = this.result + 'boolean';
      }
      if (i !== this.variables.length - 1) {
        this.result = this.result + ',';
      }
      this.result = this.result + '\n';
    }

    this.result = this.result + '  ) {\n';

    for (let i = 0; i < this.variables.length; i++) {
      this.result = this.result + '    ';
      this.result = this.result + 'this.' + this.underLine(this.variables[i].name) + ' = ' + this.underLine(this.variables[i].name);
      this.result = this.result + '\n';
    }

    this.result = this.result + '  }\n}';
  }

  generateGolang(): void {
    this.resultType = 'code';
    this.copiedMessage = '';

    this.result = 'type ' + this.underLine(this.titleCase(this.modelName)) + ' struct {\n';

    for (let i = 0; i < this.variables.length; i++) {
      this.result = this.result + '    ';
      this.result = this.result + this.underLine(this.titleCase(this.variables[i].name)) + ' ';
      if (this.variables[i].type === 'Integer') {
        this.result = this.result + 'int ';
      } else if (this.variables[i].type === 'String') {
        this.result = this.result + 'string ';
      } else  if (this.variables[i].type === 'Boolean') {
        this.result = this.result + 'bool ';
      }

      this.result = this.result + '`json:"';
      this.result = this.result + this.underLine(this.variables[i].name);
      this.result = this.result + '"`\n';
    }

    this.result = this.result + '}';
  }

  generateSQL(): void {
    this.resultType = 'code';
    this.copiedMessage = '';

    this.result = 'SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";\n';
    this.result = this.result + 'SET AUTOCOMMIT = 0;\n';
    this.result = this.result + 'START TRANSACTION;\n';
    this.result = this.result + 'SET time_zone = "+00:00";\n';

    this.result = this.result + 'CREATE TABLE `' + this.modelName + '` (\n';
    for (let i = 0; i < this.variables.length; i++) {
      this.result = this.result + '  ';
      this.result = this.result + '`' + this.variables[i].name + '` ';
      if (this.variables[i].type === 'Integer') {
        this.result = this.result + 'int';
      } else if (this.variables[i].type === 'String') {
        this.result = this.result + 'varchar';
      } else  if (this.variables[i].type === 'Boolean') {
        this.result = this.result + 'tinyint';
      }
      if (this.variables[i].type === 'Boolean') {
        this.result = this.result + '(1) ';
      } else {
        this.result = this.result + '(' + this.variables[i].length + ') ';
      }
      if (this.variables[i].isNull) {
        if (this.variables[i].defaultValue === '') {
          this.result = this.result + 'DEFAULT NULL';
        } else {
          this.result = this.result + 'DEFAULT "' + this.variables[i].defaultValue + '"';
        }
      } else {
        if (this.variables[i].defaultValue === '') {
          this.result = this.result + 'NOT NULL';
        } else {
          this.result = this.result + 'NOT NULL DEFAULT "' + this.variables[i].defaultValue + '"';
        }
      }
      if (i !== this.variables.length - 1) {
        this.result = this.result + ',';
      }
      this.result = this.result + '\n';
    }
    this.result = this.result + ') ENGINE=InnoDB DEFAULT CHARSET=utf8;\n';

    for (let i = 0; i < this.variables.length; i++) {
      if (this.variables[i].isPrimary) {
        this.result = this.result + 'ALTER TABLE `' + this.modelName + '`\n';
        this.result = this.result + '  ADD PRIMARY KEY (`' + this.variables[i].name + '`);\n';
        this.result = this.result + 'ALTER TABLE `' + this.modelName + '`\n';
        this.result = this.result + '  MODIFY `' + this.variables[i].name + '` int(11) NOT NULL AUTO_INCREMENT;\n';
        break;
      }
    }

    this.result = this.result + 'COMMIT;\n';
  }

  generateTable(): void {
    this.resultType = 'table';
    this.copiedMessage = '';
    this.result = 'table';
  }

  generateJSON(): void {
    this.resultType = 'code';
    this.copiedMessage = '';
    alert('Coming soon');
  }

  up(index: number): void {
    if ((index + 1 ) < this.variables.length) {
      alert('It is already at the top.');
    } else {
      const temp = this.variables[index];
      this.variables[index] = this.variables[index - 1];
      this.variables[index - 1] = temp;
    }
  }

  down(index: number): void {
    if ((index + 1 ) >= this.variables.length) {
      alert('It is already at the bottom.');
    } else {
      const temp = this.variables[index];
      this.variables[index] = this.variables[index + 1];
      this.variables[index + 1] = temp;
    }
  }

  delete(index: number): void {
    const result = confirm('Are you sure you want to delete ' + this.variables[index].name + ' ?');
    if (result) {
      this.variables.splice(index, 1);
      if (this.variables.length === 0) {
        this.add();
      }
    }
  }

  copy(): void {
    if (this.resultType === 'code') {
      this.selectText('code');
    } else if (this.resultType === 'table') {
      this.selectText('.result-table');
    }
    this.execCopy();
  }

  execCopy() {
    try {
      const copyStatus = this.dom.execCommand('copy');
      copyStatus ? this.copiedMessage = 'Copied' : this.copiedMessage = 'Something wrong...';
    } catch (error) {
      console.log(`${error}`);
    }
    window.getSelection().removeAllRanges();
  }

  selectText(selector: string): void {
    const element = this.dom.querySelector(selector);
    const isInputElement = element instanceof HTMLInputElement;
    const isTextAreaElement = element instanceof HTMLTextAreaElement;

    if (isInputElement || isTextAreaElement) {
      (element as HTMLInputElement).select();
    } else {
      const range = this.dom.createRange();
      range.selectNodeContents(element);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  titleCase(input: string): string {
    return input.length === 0 ? '' :
      input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() ));
  }

  underLine(input: string): string {
    return input.length === 0 ? '' :
      input.replace(/_./g, (txt => txt.slice(-1).toUpperCase() ));
  }
}
