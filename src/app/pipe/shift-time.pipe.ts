import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shiftTime'
})
export class ShiftTimePipe implements PipeTransform {

  transform(time: string): string {
    if(!time) {
      return '';
    }
 
    let hour = (time.split(':'))[0];
    let min = (time.split(':'))[1];
    let amPM;
    if(hour > '12'){
      amPM = 'PM';
      let h = parseInt(hour) - 12;
      hour = h.toString();
    }else {
      amPM = 'AM';
      hour = hour;
    }

    if(hour === '0'){
      hour = '12';
    }
    // if min is single digit like 5 then append a 0 at the beginning like '05'
    min = min.length == 1 ? `0${min}` : min;

    hour = hour.length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${amPM}`;
  }

}
