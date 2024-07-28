import { Pipe, PipeTransform } from '@angular/core';
import dayjs from "dayjs";
@Pipe({
  name: 'formatearFecha',
  standalone: true
})
export class FormatearFechaPipe implements PipeTransform {

  transform(value: any) {
    let fecha=new Date(value);
    return `${dayjs(fecha).format("DD")}/${dayjs(fecha).format("MM")}/${dayjs(fecha).format("YYYY")}`;
  }

}
