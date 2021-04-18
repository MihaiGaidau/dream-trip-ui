import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'transform'
})
export class TransformPipe implements PipeTransform {

  transform(name: any): any {
    switch (name) {
      case 'ro':
        name = 'Română';
        break;
      case 'en':
        name = 'English';
        break;
      case 'ru':
        name = 'Русский';
        break;
    }
    return name.replace(name, name);
  }

}
