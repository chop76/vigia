import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public http: HttpClient) {

   }

  ngOnInit() {


  }

  login( usuario: string, pass: string, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('usuario', usuario);
    } else {
      localStorage.removeItem('usuario');
    }

    const URL_SERVICIOS = 'https://vigia.ephpo.es/';
    const url = URL_SERVICIOS + 'ajax/usuario.php?op=verificar';

    return this.http.post( url, {'logina': usuario, 'clavea': pass} )
      .map( (resp: any) => {
        console.log( resp);
        return true;
      });

  }
  ingresar( forma: NgForm ) {

    console.log( forma.value) ;
    this.login(forma.value.usuario, forma.value.password, forma.value.recuerdame)
      .subscribe( correcto => console.log(correcto)  );

  } 
}