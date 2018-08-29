export class VariableModel {
  id: number;
  name: string;
  type: string;
  length: number;
  defaultValue: string;
  isNull: boolean;
  isPrimary: boolean;

  constructor(
    id: number,
    name: string,
    type: string,
    length: number,
    defaultValue: string,
    isNull: boolean,
    isPrimary: boolean
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.length = length;
    this.defaultValue = defaultValue;
    this.isNull = isNull;
    this.isPrimary = isPrimary;
  }
}
