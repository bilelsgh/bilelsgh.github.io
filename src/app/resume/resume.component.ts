import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  fr : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  switchLang(){
    this.fr = !this.fr;
  }

}
