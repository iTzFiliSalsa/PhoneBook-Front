import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public img: string;
  public contact: Array<Contact>;
  public user: any;

  constructor(
    private _contactService: ContactsService,
    public _utilService: UtilsService,
    private router: Router
  ) {
    this.img = 'https://media-exp1.licdn.com/dms/image/C560BAQFrs9_WzH_Owg/company-logo_200_200/0?e=2159024400&v=beta&t=8bscvyLU2XaBJk8W3_tICLk3h77X7E9yglnk2XNTm9Q';
    this.contact = new Array<Contact>();
    this.user = JSON.parse(localStorage.getItem("user_neoris"));
  }

  ngOnInit(): void {
    this._contactService.getContacts().subscribe(
      res => {
        this.contact = res;
        console.log(this.contact);
      },
      err => {
        console.log(err);
      }
    )
  }

  goTo(i): void{
    // description/:id/:nombre/:cargo/:telefono/:url'
    localStorage.setItem("img", i.url);
    this._utilService.img = localStorage.getItem("img");
    this.router.navigateByUrl(`/home/content/description/${i.id}/${i.nombre}/${i.cargo}/${i.telefono}`);
  }

}
