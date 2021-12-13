import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function toBase64(file:File){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  })
}

export function parseWebAPIErrors(response:any): string[] {
  const result: string[] = [];

  if(response.error){
    if(typeof response.error === 'string'){
      result.push(response.error);
    }else if(Array.isArray(response.error)){
      response.error.forEach((value: { description: string; }) => result.push(value.description));
    } else{
      const mapErrors = response.error.errors;
      const entries = Object.entries(mapErrors);
      entries.forEach((arr:any[]) => {
        const field = arr[0];
        arr[1].forEach((errorMessage: any) => {
          result.push(`${field}: ${errorMessage}`);
        });
      })
    }
  }

  return result;
}
export function timeInSec(time):number{
  if(typeof(time) === 'string'){
    if(time.includes(":")){
      const times: Array<string> = time.split(":");
      let seconds = parseInt(times[0])*60;
      seconds += parseFloat(times[1]);
      return seconds;
    }else{
      return parseFloat(time);
    }
  }else{
    return parseFloat(time);
  }
}
export function secondsToMMSS(secs){
  let str:string="";
  str += Math.floor(secs/60).toString()+":";
  if(secs%60 < 10){
    str += "0"+(secs%60).toFixed(3).toString();
  }else{
    str += (secs%60).toFixed(3).toString();
  }
  return str;
}
export function formatDateFormData(date:Date){
  date = new Date(date);
  const format = new Intl.DateTimeFormat('en',{
    year:'numeric',
    month:'2-digit',
    day:'2-digit'
  });

  const [
    {value:month},,
    {value:day},,
    {value:year},
  ] = format.formatToParts(date);

  return `${year}-${month}-${day}`;
}

const secondsAndMilisecondsRE = /^(\d+)?(\.\d+)?$/;
const integerRE = /^[1-9][0-9]*$/;
const compoundRE = /^([A-Z][a-z]*|[a-z]+)$/;
const lapTimeRE =/^([0-9]+):([0-5][0-9]):([0-5][0-9])$/;

export {secondsAndMilisecondsRE,integerRE,compoundRE,lapTimeRE};

