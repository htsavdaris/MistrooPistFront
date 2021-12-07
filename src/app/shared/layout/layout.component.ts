import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isLoggedIn!: Observable<boolean>;

  constructor(public authService : AuthService) { 
    this.isLoggedIn = authService.isLoggedIn$();
  }

  ngOnInit(): void {
  }

}
