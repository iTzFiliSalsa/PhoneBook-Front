import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    public _utilService: UtilsService,
    private route: Router
  ){
    if(localStorage.getItem("user_neoris") == null){
      this.route.navigateByUrl('/login');
    }
  }
}
