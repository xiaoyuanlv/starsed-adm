import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn !== true) {
      this.router.navigate(['auth/login']);
    } else if(this.authService.isLoggedIn) {
       this.authService.afAuth.authState.subscribe((user) => {
        if (user != null) {
          if(user.email == this.authService.adminEmail){
            return true;
          } else {
            this.router.navigate(['auth/login']);
          }
        } else {
          this.router.navigate(['auth/login']);
        }
      });
    }
    return true;
  }
  
}
