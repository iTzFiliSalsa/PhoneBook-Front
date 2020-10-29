import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  public register: FormGroup;
  public img: string;

  constructor(
    private formBuilder: FormBuilder,
    private _utilService: UtilsService,
    private _contactService: ContactsService
  ) {
    this.img = 'https://media-exp1.licdn.com/dms/image/C560BAQFrs9_WzH_Owg/company-logo_200_200/0?e=2159024400&v=beta&t=8bscvyLU2XaBJk8W3_tICLk3h77X7E9yglnk2XNTm9Q';
    this.register = formBuilder.group({
      Usuario: [JSON.parse(localStorage.getItem("user_neoris")).id],
      Url: ['', [Validators.required, Validators.maxLength(1000)]],
      Nombre: ['', Validators.required],
      Cargo: ['', Validators.required],
      Telefono: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  refresh(): void{
    this.img = this.register.value.Url;
  }

  post(): void{

    
    
    console.log(this.register.value);
    this._utilService.show = true;
    this._contactService.postContact(this.register.value).subscribe(
      res => {
        location.reload();
        console.log(res);
      },
      err => {
        console.log(<any>err);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al registrar',
          icon: 'error'
        })
      }
    ).add(()=> {
      this._utilService.show = false;
    })
  }

}
