import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public show: boolean;
  public responsive: boolean;
  public img: string;
  public user: any;
  public innerWidth: any;
  public showButtons: boolean;

  constructor() {
    this.show = false;
    this.img = 'https://media-exp1.licdn.com/dms/image/C560BAQFrs9_WzH_Owg/company-logo_200_200/0?e=2159024400&v=beta&t=8bscvyLU2XaBJk8W3_tICLk3h77X7E9yglnk2XNTm9Q';
    this.user = JSON.parse(localStorage.getItem("user_neoris"));
    console.log(this.user);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.getWidth();
  }

  ngOnInit(): void {
    this.getWidth();
  }

  getWidth(){
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 700){
      this.showButtons = true;
      this.show = true;
    }else{
      this.showButtons = false;
      this.show = false;
    }
  }

  toggle(): void{
    this.show = !this.show ? true : false;
    console.log(this.show);
  }

  toHide(): void{
    this.responsive = !this.responsive ? true : false;
    console.log(this.responsive);
  }

  logout(): void{
    localStorage.removeItem("user_neoris");
    location.reload();
  }

}
