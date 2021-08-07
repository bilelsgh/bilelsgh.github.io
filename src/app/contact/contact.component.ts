import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OptionService } from '../services/options.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  mail : boolean = false;

  public fr: boolean = true;
  public frSub: Subscription = new Subscription;

  constructor(private oServ: OptionService) { }

  ngOnInit(): void {
    this.frSub = this.oServ.langSubject.subscribe(
      (elt: boolean) => {
        this.fr = elt;
      }
    );
    this.oServ.emitLangSubject();
  }

  switchLang(){
    this.oServ.switchLang();
  }

  showMail(){
    this.mail = !this.mail;
  }


}
