import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  public profile: any;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _utilService: UtilsService
  ) {
    this.profile = JSON.parse(localStorage.getItem("user_neoris"));
    this.form = fb.group({
      Id: [parseInt(this.profile.id)],
      Name: [this.profile.name, [Validators.required]],
      LastName: [this.profile.lastName, [Validators.required]],
      Email: [this.profile.email, [Validators.required, Validators.email]],
      Password: ['', [Validators.required]] ,
      confirmPass: ['', [Validators.required] ]
    }, {
      validators: this.password.bind(this)
    })
  }

  password(formGroup: FormGroup){
    const { value: Password } = formGroup.get('Password');
    const { value: confirmPass } = formGroup.get('confirmPass');
    return Password === confirmPass ? null : { passwordNotMatch: true };
  }

  ngOnInit(): void {
    if(!this.profile.url){
      this.profile.url = 'https://media-exp1.licdn.com/dms/image/C560BAQFrs9_WzH_Owg/company-logo_200_200/0?e=2159024400&v=beta&t=8bscvyLU2XaBJk8W3_tICLk3h77X7E9yglnk2XNTm9Q'
    }
  }

  send(): void{

    this._utilService.show = true;

    this._authService.update(this.form.value, this.form.value.Id).subscribe(
      res => {
        const user = {
          id: this.form.value.Id,
          name: this.form.value.Name,
          lastName: this.form.value.LastName,
          email: this.form.value.Email
        }
        console.log(res);
        localStorage.setItem("user_neoris", JSON.stringify(user));
        location.reload();
      },
      err => {
        console.log(<any>err);
      }
    ).add(() => {
      this._utilService.show = false;
    })
  }

}
