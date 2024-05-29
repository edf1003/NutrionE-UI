/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core';
import { Dayjs } from 'dayjs';

@Injectable()
export class UtilsService {
  private readonly acceptedImageExtensions = ['jpg', 'jpeg', 'bmp', 'png'];

  // MDBootstrap datepicker

  public datepickerOptions = {
    title: '',
    monthsFull: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    weekdaysNarrow: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  };

  /* End MDBootstrap datepicker*/

  //returns a guid-v4 (not crypto-safe, no high-quality RNG, but pseudo-guaranteed uniqueness)
  getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  isImageExtension(f: File): boolean {
    const dots = f.name.split('.');
    if (dots.length < 1) return false;
    const ext = dots.pop().toLowerCase();
    return this.acceptedImageExtensions.includes(ext);
  }

  getImageExtension(f: File): string {
    if (!f) return '';
    const dots = f.name.split('.');
    if (dots.length < 1) return '';
    return dots.pop().toLowerCase();
  }

  getCurrentSpainDate() {
    return new Date(new Date().toLocaleString('en-EN', { timeZone: 'Europe/Madrid' }));
  }

  //example: toDictionary([{name:"Apple", val:1}, {name:"Orange",val:2}], "name") ===> { "Orange":..., "Apple":...}
  toDictionary(arr: unknown[], keyName: string | number) {
    return this.toDictionaryByKeySelector(arr, e => e[keyName]);
  }

  toDictionaryByKeySelector<T>(arr: T[], keySelector: (arg: T) => unknown) {
    return arr.reduce((map, obj) => {
      map[keySelector(obj)?.toString()] = obj;
      return map;
    }, {});
  }

  stripHtml(html: string) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  getTimezone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (err) {
      return 'Europe/Madrid';
    }
  }

  toSnakeCase(str: string) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  toddMMyyyy(date: Date) {
    return new Dayjs(date).format('DD/MM/YYYY');
  }

  fromddMMyyyy(strDate: string) {
    try {
      const split = strDate.split('/');
      const utcDate = Date.UTC(parseInt(split[2]), parseInt(split[1]) - 1, parseInt(split[0]));
      return new Date(utcDate);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  dateToYYYYMMDD(from: Date) {
    return `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`;
  }

  numberToLetters(num: number) {
    let letters = '';
    while (num >= 0) {
      letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num % 26] + letters;
      num = Math.floor(num / 26) - 1;
    }
    return letters;
  }

  groupBy<T>(collection: T[], it: (arg0: T) => string) {
    const grouped = {};

    const getKey = (item: T) => (typeof it === 'function' ? it(item) : item[it]);
    collection.forEach(item => {
      const key = getKey(item);
      if (!Object.prototype.hasOwnProperty.call(grouped, key)) grouped[key] = [];
      grouped[key].push(item);
    });

    return grouped;
  }

  getParamsForPaginationAndFilter(skip: number, take: number, orderBy: string, desc: boolean, filter?: object) {
    const params = { skip, take, orderBy, desc };
    if (filter) {
      Object.keys(filter).forEach(key => {
        if (filter[key] !== null && filter[key] !== undefined) {
          params[key] = filter[key];
        }
      });
    }
    return params;
  }

  //creates a query string from an object, by iterating through its fields and concatenating them. Only works for objects with string, number, Date and bool fields.
  //Examples: createFilterObjectQueryString({alpha: 'test', beta: 23.2, delta: null, omega:undefined}, "pp") => "?pp.alpha=test&pp.beta=23.2&pp.delta=null"
  //          createFilterObjectQueryString({alpha: 'test', beta: 23.2, delta: null, omega:undefined}, "") => "?alpha=test&beta=23.2&delta=null"
  //          createFilterObjectQueryString({alpha: new Date(), beta: 23.2}, "pp", "&") => "&pp.alpha=2021-04-08T08:01:39.740Z&pp.beta=23.2"
  createFilterObjectQueryString(filterObject: object, filterName: string, startCharacter = '?') {
    if (!filterObject) return '';
    let queryString = '';
    filterName = filterName ? `${filterName}.` : '';
    let sc = startCharacter;
    for (const prop in filterObject) {
      if (
        Object.prototype.hasOwnProperty.call(filterObject, prop) &&
        (filterObject[prop] || (filterObject[prop] !== undefined && !isNaN(filterObject[prop])))
      ) {
        if (Array.isArray(filterObject[prop]) && filterObject[prop]?.length) {
          for (const it of filterObject[prop]) queryString += this.filterSimpleObject(it, prop, sc, filterName);
        } else queryString += this.filterSimpleObject(filterObject[prop], prop, sc, filterName);
        sc = '&';
      }
    }
    return queryString;
  }

  private filterSimpleObject(item: object, prop: string, sc: string, filterName: string) {
    if (item instanceof Date && !isNaN(item.valueOf())) return `${sc}${filterName}${prop}=${item.toISOString()}`;
    else return `${sc}${filterName}${prop}=${item}`;
  }

  getFirstLetterOfEachWord(str: string) {
    if (!str) return '';
    return str.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '');
  }
}
