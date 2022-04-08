import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {TokenStorageService} from "../service/token-storage.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private tokenStorageService:TokenStorageService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    const currentUser =  this.tokenStorageService.getUser();
    if(currentUser!==null){
      let role = currentUser.roles[0];
      if(route.data.roles.indexOf(role) === -1){
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url }});
        return false;
      }
      return true;
    }
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;

  }

}
