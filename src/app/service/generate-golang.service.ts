import { Injectable } from '@angular/core';

import { VariableModel } from '../model/variable.model';
import { WordProcessService } from './word-process.service';

@Injectable({
  providedIn: 'root'
})
export class GenerateGolangService {

  constructor(private wordProcessService: WordProcessService) { }

  generate(variables: VariableModel[], modelName: string): string {
    let result: string;

    result = 'type ' + this.wordProcessService.underLine(this.wordProcessService.titleCase(modelName)) + ' struct {\n';

    for (let i = 0; i < variables.length; i++) {
      result = result + '    ';
      result = result + this.wordProcessService.underLine(this.wordProcessService.titleCase(variables[i].name)) + ' ';
      if (variables[i].type === 'Integer') {
        result = result + 'int ';
      } else if (variables[i].type === 'String') {
        result = result + 'string ';
      } else  if (variables[i].type === 'Boolean') {
        result = result + 'bool ';
      }

      result = result + '`json:"';
      result = result + this.wordProcessService.underLine(variables[i].name);
      result = result + '"`\n';
    }

    result = result + '}';

    return result;
  }
}
