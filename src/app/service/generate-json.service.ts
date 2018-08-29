import { Injectable } from '@angular/core';

import { VariableModel } from '../model/variable.model';

@Injectable({
  providedIn: 'root'
})
export class GenerateJsonService {

  constructor() { }

  generate(variables: VariableModel[]): string {
    let result: string;

    result = '{\n';
    for (let i = 0; i < variables.length; i++) {
      result = result + '  ';
      result = result + '"' + variables[i].name + '" : ';
      if (variables[i].type === 'Integer') {
        result = result + '1';
      } else if (variables[i].type === 'String') {
        result = result + '"text"';
      } else  if (variables[i].type === 'Boolean') {
        result = result + 'true';
      }
      if (i !== variables.length - 1) {
        result = result + ',';
      }
      result = result + '\n';
    }
    result = result + '}';

    return result;
  }
}
