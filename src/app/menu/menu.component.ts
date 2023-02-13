import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  name: any = '';
  content: string;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    //this.name = localStorage.getItem('name');
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
    }

    // this.userService.getAdminBoard().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // );

  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}