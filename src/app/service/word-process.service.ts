import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordProcessService {

  constructor() { }

  titleCase(input: string): string {
    return input.length === 0 ? '' :
      input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() ));
  }

  underLine(input: string): string {
    return input.length === 0 ? '' :
      input.replace(/_./g, (txt => txt.slice(-1).toUpperCase() ));
  }
}
