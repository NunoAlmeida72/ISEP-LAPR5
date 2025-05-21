import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  groupName = 'Group 68';
  contactEmail = '1201293@isep.ipp.pt / 1201289@isep.ipp.pt / 1211555@isep.ipp.pt / 1211650@isep.ipp.pt / 1201123@isep.ipp.pt';
  currentYear = new Date().getFullYear();
}
