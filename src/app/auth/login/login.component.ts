import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login: FormGroup;
  public register: FormGroup;
  public error: boolean;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _utilService: UtilsService,
    private router: Router
  ) {
    this.login = this.fb.group({
      Email: ['', [Validators.email ,Validators.required]],
      Password: ['', [Validators.required]]
    });

    this.register = this.fb.group({
      Name: new FormControl('', [ Validators.required ]),
      LastName: new FormControl('', [Validators.required]) ,
      Email: new FormControl('', [Validators.required]) ,
      Password: new FormControl('', [Validators.required]) ,
      confirmPass: new FormControl('', [Validators.required] )
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
    
  }

  logMe():void{
    this._utilService.show = true;

    this._authService.login(this.login.value).subscribe(
      res => {
        if(!res){
          console.log("No se encontro nada");
          this.error = true;
        }else{
          localStorage.setItem("user_neoris", JSON.stringify(res));
          this.router.navigateByUrl('/home/content');
        }
      },
      err =>{
        console.log(<any>err);
        this.error = true;
      }
    ).add(() => {
      this._utilService.show = false;
    })
  }

  subMe():void{
    this._utilService.show = true;

    this._authService.register(this.register.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(<any>err);
      }
    ).add(() => {
      this._utilService.show = false;
    })
  }

}
