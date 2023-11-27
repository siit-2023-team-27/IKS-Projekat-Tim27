import {Component, HostListener, OnInit} from '@angular/core';
import {faPersonWalkingLuggage, faBars, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faUser, faHeart, faEnvelope, faFileLines} from "@fortawesome/free-regular-svg-icons";
import {
  Datepicker,
  Input,
  initTE,
  Select
} from "tw-elements";
import {User} from "../../infrastructure/auth/model/user.model";
import {AuthService} from "../../infrastructure/auth/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

   user: User = {
    id: 0,
    username: 'admin',
    role: 'admin',
  };
  constructor() {}

  faPersonWalkingLuggage = faPersonWalkingLuggage;
  faHeart = faHeart;
  faEnvelope = faEnvelope;
  faUser = faUser;
  faFileLines = faFileLines;
  faBars = faBars;
  faMagnifyingGlass= faMagnifyingGlass;
  navBar:boolean=true;
  getScreenWidth: any;
  showDropDownMenu(){
    if (this.navBar){
      this.navBar=false;
    }else{
      this.navBar=true;
    }
  }
  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    if(this.getScreenWidth<=768){
      this.navBar=false;
    }else {
      this.navBar = true
    }

    initTE({ Datepicker, Input, Select });
}
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;

    if(this.getScreenWidth<=768){
      this.navBar=false;
    }else {
      this.navBar = true
    }
  }

  onLogout(): void {
  }
}
