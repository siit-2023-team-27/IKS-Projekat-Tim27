import { Component, HostListener } from '@angular/core';
import {
  faPersonWalkingLuggage,
  faBars,
  faMagnifyingGlass,
  faSearch,
  faLocation, faLocationArrow, faPeopleGroup
} from "@fortawesome/free-solid-svg-icons";
import {faUser, faHeart, faEnvelope, faFileLines} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  faPersonWalkingLuggage = faPersonWalkingLuggage;
  faHeart = faHeart;
  faEnvelope = faEnvelope;
  faUser = faUser;
  faFileLines = faFileLines;
  faBars = faBars;
  protected readonly faSearch = faSearch;
  protected readonly faLocation = faLocation;
  protected readonly faLocationArrow = faLocationArrow;
  protected readonly faPeopleGroup = faPeopleGroup;
  faMagnifyingGlass= faMagnifyingGlass;
  navBar:boolean=true;
  getScreenWidth: any;
  navLinks = document.querySelector('.nav-links')
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

}
