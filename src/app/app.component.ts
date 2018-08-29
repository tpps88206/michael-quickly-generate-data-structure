import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { VariableModel } from './model/variable.model';
import { GenerateSqlService } from './service/generate-sql.service';
import { GenerateJsonService } from './service/generate-json.service';
import { GenerateGolangService } from './service/generate-golang.service';
import { GenerateAngularService } from './service/generate-angular.service';

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

  constructor(
    @Inject(DOCUMENT) private dom: Document,
    private generateSqlService: GenerateSqlService,
    private generateJsonService: GenerateJsonService,
    private generateGolangService: GenerateGolangService,
    private generateAngularService: GenerateAngularService,
  ) {

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

    this.result = this.generateAngularService.generate(this.variables, this.modelName);
  }

  generateGolang(): void {
    this.resultType = 'code';
    this.copiedMessage = '';

    this.result = this.generateGolangService.generate(this.variables, this.modelName);
  }

  generateSQL(): void {
    this.resultType = 'code';
    this.copiedMessage = '';

    this.result = this.generateSqlService.generate(this.variables, this.modelName);
  }

  generateTable(): void {
    this.resultType = 'table';
    this.copiedMessage = '';
    this.result = 'table';
  }

  generateJSON(): void {
    this.resultType = 'code';
    this.copiedMessage = '';

    this.result = this.generateJsonService.generate(this.variables);
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
}
