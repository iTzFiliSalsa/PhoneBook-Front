import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ContactsService } from 'src/app/services/contacts.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  @ViewChild("swal", {static: true}) swal: SwalComponent;

  public values: any;
  public editForm: FormGroup;
  public img: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    public _utilService: UtilsService,
    private _contactService: ContactsService
  ) {
    this.img = this._utilService.img;
    console.log(JSON.parse(localStorage.getItem("user_neoris")));
    
    this.editForm = formBuilder.group({
      Id: [''],
      Usuario: [JSON.parse(localStorage.getItem("user_neoris")).id],
      Url: [this._utilService.img, [Validators.required]],
      Nombre: ['', [Validators.required]],
      Cargo: ['', [Validators.required]],
      Telefono: ['', [Validators.required]]
    })

    router.events.subscribe((val) => {
      // see also 

      this.values = {
        id: this.route.snapshot.params.id,
        nombre: this.route.snapshot.params.nombre,
        cargo: this.route.snapshot.params.cargo,
        telefono: this.route.snapshot.params.telefono
      }

      this.editForm = formBuilder.group({
        Id: [parseInt(this.values.id)],
        Usuario: [parseInt(JSON.parse(localStorage.getItem("user_neoris")).id)],
        Url: [this._utilService.img, [Validators.required]],
        Nombre: [this.values.nombre, [Validators.required]],
        Cargo: [this.values.cargo, [Validators.required]],
        Telefono: [this.values.telefono, [Validators.required]]
      })
  });
  }

  ngOnInit(): void {

  }

  edit(): void{
    this.swal.fire();
  }

  refresh():void{
    console.log("refresh");
  }

  editPost(){
    this._utilService.show = true;

    this._contactService.updateContact(this.editForm.value, (this.editForm.value.Id)).subscribe(
      res => {
        console.log(res);
        location.reload();
      },
      err => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al registrar',
          icon: 'error'
        })
        console.log(<any>err);
      }
    ).add(()=> {
      this._utilService.show = false;
    })
  }

}
