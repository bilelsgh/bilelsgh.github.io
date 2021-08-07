import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OptionService {
    langSubject = new Subject<boolean>();
    fr = true;

    constructor(private router: Router) {
    }

    
    emitLangSubject(){
        this.langSubject.next(this.fr);
    }

    switchLang(){
        this.fr = !this.fr;
        this.emitLangSubject();
    }
}