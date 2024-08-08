import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestLogin } from '../../resources/models/Request.login';
import { LoginService } from '../../resources/models/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  

  public requestLogin!: RequestLogin;

  constructor(private loginService: LoginService, private router:Router){}

  
  ngOnInit(): void {
    this.requestLogin = new RequestLogin()
  }
  
  public onLogin(): void {
    this.loginService.Onlogin(this.requestLogin).subscribe({
      next: (data) => {
        console.log('Login bem-sucedido:', data);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Erro no login:', error);
        alert('Erro ao fazer login: ' + error.error.message);
      }
  });
  }
}
  
  


