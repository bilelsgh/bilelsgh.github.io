import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OptionService } from '../services/options.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
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
