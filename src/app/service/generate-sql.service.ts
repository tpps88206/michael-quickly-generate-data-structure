import { Injectable } from '@angular/core';

import { VariableModel } from '../model/variable.model';

@Injectable({
  providedIn: 'root'
})
export class GenerateSqlService {

  constructor() { }

  generate(variables: VariableModel[], modelName: string): string {
    let result: string;

    result = 'SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";\n';
    result = result + 'SET AUTOCOMMIT = 0;\n';
    result = result + 'START TRANSACTION;\n';
    result = result + 'SET time_zone = "+00:00";\n';

    result = result + 'CREATE TABLE `' + modelName + '` (\n';
    for (let i = 0; i < variables.length; i++) {
      result = result + '  ';
      result = result + '`' + variables[i].name + '` ';
      if (variables[i].type === 'Integer') {
        result = result + 'int';
      } else if (variables[i].type === 'String') {
        result = result + 'varchar';
      } else  if (variables[i].type === 'Boolean') {
        result = result + 'tinyint';
      }
      if (variables[i].type === 'Boolean') {
        result = result + '(1) ';
      } else {
        result = result + '(' + variables[i].length + ') ';
      }
      if (variables[i].isNull) {
        if (variables[i].defaultValue === '') {
          result = result + 'DEFAULT NULL';
        } else {
          result = result + 'DEFAULT "' + variables[i].defaultValue + '"';
        }
      } else {
        if (variables[i].defaultValue === '') {
          result = result + 'NOT NULL';
        } else {
          result = result + 'NOT NULL DEFAULT "' + variables[i].defaultValue + '"';
        }
      }
      if (i !== variables.length - 1) {
        result = result + ',';
      }
      result = result + '\n';
    }
    result = result + ') ENGINE=InnoDB DEFAULT CHARSET=utf8;\n';

    for (let i = 0; i < variables.length; i++) {
      if (variables[i].isPrimary) {
        result = result + 'ALTER TABLE `' + modelName + '`\n';
        result = result + '  ADD PRIMARY KEY (`' + variables[i].name + '`);\n';
        result = result + 'ALTER TABLE `' + modelName + '`\n';
        result = result + '  MODIFY `' + variables[i].name + '` int(11) NOT NULL AUTO_INCREMENT;\n';
        break;
      }
    }

    result = result + 'COMMIT;\n';

    return result;
  }
}
