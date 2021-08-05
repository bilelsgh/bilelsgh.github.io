import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  fr : boolean = true;
  mail : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  switchLang(){
    this.fr = !this.fr;
  }

  showMail(){
    this.mail = true;
  }

}
