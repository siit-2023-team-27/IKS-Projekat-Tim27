import { Component, HostListener } from '@angular/core';
import {
  faPersonWalkingLuggage,
  faBars,
  faMagnifyingGlass,
  faSearch,
  faBolt,
  faList, faUsers,  faArrowRightFromBracket,
  faLocation, faLocationArrow, faPeopleGroup
} from "@fortawesome/free-solid-svg-icons";
import {faUser, faHeart, faEnvelope, faFileLines} from "@fortawesome/free-regular-svg-icons";
import {User} from "../../infrastructure/auth/model/user.model";
import {AuthService} from "../../infrastructure/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(private authService: AuthService, private router:Router) {}
  faPersonWalkingLuggage = faPersonWalkingLuggage;
  faHeart = faHeart;
  faEnvelope = faEnvelope;
  faUser = faUser;
  faFileLines = faFileLines;
  faBolt = faBolt;
  faArrowRightFromBracket= faArrowRightFromBracket;
  faList = faList
  faUsers = faUsers;
  faBars = faBars;
  protected readonly faSearch = faSearch;
  protected readonly faLocation = faLocation;
  protected readonly faLocationArrow = faLocationArrow;
  protected readonly faPeopleGroup = faPeopleGroup;
  faMagnifyingGlass= faMagnifyingGlass;
  navBar:boolean=true;
  getScreenWidth: any;
  isHomePage(): boolean {
    return this.router.url === "/home";
  }
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

    this.authService.user$.subscribe(user => {
      this.user = user;
    });
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

  user: User | undefined;



  onLogout(): void {
    this.authService.logout();
  }

}
