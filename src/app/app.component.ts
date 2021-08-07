import { Component } from '@angular/core';
import 'material-icons/iconfont/material-icons.css';
import { Subscription } from 'rxjs';
import { OptionService } from './services/options.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'planMyTrip';
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
