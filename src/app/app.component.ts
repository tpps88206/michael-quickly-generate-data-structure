import {Component, OnInit, Inject} from '@angular/core';
import {VariableModel} from './variable.model';
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
  typeList = ['數字', '字串', '布林值'];
  copiedMessage = '';

  constructor(@Inject(DOCUMENT) private dom: Document) {

  }

  ngOnInit() {
    this.add();
  }

  add(): void {
    this.variables.push(new VariableModel(
      this.variables.length,
      '',
      '數字',
      0,
      '',
      false,
      false
      )
    );
  }

  generateAngular(): void {
    this.copiedMessage = '';

    this.result = 'export class ' + this.titleCase(this.modelName) + 'Model {\n';

    for (let i = 0; i < this.variables.length; i++) {
      this.result = this.result + '  ';
      this.result = this.result + this.variables[i].name + ': ';
      if (this.variables[i].type === '數字') {
        this.result = this.result + 'number;';
      } else if (this.variables[i].type === '字串') {
        this.result = this.result + 'string;';
      } else  if (this.variables[i].type === '布林值') {
        this.result = this.result + 'boolean;';
      }
      this.result = this.result + '\n';
    }

    this.result = this.result + '  constructor(\n';

    for (let i = 0; i < this.variables.length; i++) {
      this.result = this.result + '    ';
      this.result = this.result + this.variables[i].name + ': ';
      if (this.variables[i].type === '數字') {
        this.result = this.result + 'number';
      } else if (this.variables[i].type === '字串') {
        this.result = this.result + 'string';
      } else  if (this.variables[i].type === '布林值') {
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
      this.result = this.result + 'this.' + this.variables[i].name + ' = ' + this.variables[i].name;
      this.result = this.result + '\n';
    }

    this.result = this.result + '  }\n}';
  }

  generateGolang(): void {
    this.copiedMessage = '';

    this.result = 'type ' + this.titleCase(this.modelName) + ' struct {\n';

    for (let i = 0; i < this.variables.length; i++) {
      this.result = this.result + '    ';
      this.result = this.result + this.titleCase(this.variables[i].name);
      if (this.variables[i].type === '數字') {
        this.result = this.result + ' int ';
      } else if (this.variables[i].type === '字串') {
        this.result = this.result + ' string ';
      } else  if (this.variables[i].type === '布林值') {
        this.result = this.result + ' bool ';
      }

      this.result = this.result + '`json:"';
      this.result = this.result + this.variables[i].name;
      this.result = this.result + '"`\n';
    }

    this.result = this.result + '}';
  }

  generateSQL(): void {
    this.copiedMessage = '';

    this.result = 'SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";\n';
    this.result = this.result + 'SET AUTOCOMMIT = 0;\n';
    this.result = this.result + 'START TRANSACTION;\n';
    this.result = this.result + 'SET time_zone = "+00:00";\n';

    this.result = this.result + 'CREATE TABLE `' + this.modelName + '` (\n';
    for (let i = 0; i < this.variables.length; i++) {
      this.result = this.result + '  ';
      this.result = this.result + '`' + this.variables[i].name + '` ';
      if (this.variables[i].type === '數字') {
        this.result = this.result + 'int';
      } else if (this.variables[i].type === '字串') {
        this.result = this.result + 'varchar';
      } else  if (this.variables[i].type === '布林值') {
        this.result = this.result + 'tinyint';
      }
      if (this.variables[i].type === '布林值') {
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

  up(index: number): void {

  }

  down(index: number): void {

  }

  delete(index: number): void {
    this.variables.splice(index, 1);
  }

  copy(): void {
    this.selectText('code');
    this.execCopy();
  }

  execCopy() {
    try {
      const copyStatus = this.dom.execCommand('copy');
      copyStatus ? this.copiedMessage = '已複製' : this.copiedMessage = '複製出了點問題QAQ...請手動複製';
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
}
