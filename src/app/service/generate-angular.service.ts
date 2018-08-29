import { Injectable } from '@angular/core';

import { VariableModel } from '../model/variable.model';
import { WordProcessService } from './word-process.service';

@Injectable({
  providedIn: 'root'
})
export class GenerateAngularService {

  constructor(private wordProcessService: WordProcessService) { }

  generate(variables: VariableModel[], modelName: string): string {
    let result: string;

    result = 'export class ' + this.wordProcessService.underLine(this.wordProcessService.titleCase(modelName)) + 'Model {\n';

    for (let i = 0; i < variables.length; i++) {
      result = result + '  ';
      result = result + this.wordProcessService.underLine(variables[i].name) + ': ';
      if (variables[i].type === 'Integer') {
        result = result + 'number;';
      } else if (variables[i].type === 'String') {
        result = result + 'string;';
      } else  if (variables[i].type === 'Boolean') {
        result = result + 'boolean;';
      }
      result = result + '\n';
    }

    result = result + '  constructor(\n';

    for (let i = 0; i < variables.length; i++) {
      result = result + '    ';
      result = result + this.wordProcessService.underLine(variables[i].name) + ': ';
      if (variables[i].type === 'Integer') {
        result = result + 'number';
      } else if (variables[i].type === 'String') {
        result = result + 'string';
      } else  if (variables[i].type === 'Boolean') {
        result = result + 'boolean';
      }
      if (i !== variables.length - 1) {
        result = result + ',';
      }
      result = result + '\n';
    }

    result = result + '  ) {\n';

    for (let i = 0; i < variables.length; i++) {
      result = result + '    ';
      result = result + ''
        + this.wordProcessService.underLine(variables[i].name)
        + ' = '
        + this.wordProcessService.underLine(variables[i].name);
      result = result + '\n';
    }

    result = result + '  }\n}';

    return result;
  }
}
