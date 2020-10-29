import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public show: boolean;
  public img: string;

  constructor() {
    this.show = false;
    this.img = localStorage.getItem("img");
  }

  public set _show(show){
    this.show = show;
  }

  public get _show(){
    return this.show;
  }

  public set _img(img){
    this.img = img;
  }

  public get _img(){
    return this.img;
  }
}
