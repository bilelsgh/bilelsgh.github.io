import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OptionService } from '../services/options.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

}
