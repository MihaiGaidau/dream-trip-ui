import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  public services: number[] = [1, 1, 1];
  public paragraphs: number[][] = [];
  public list: string[];

  constructor() { }

  /** add terms array */
  private initData(): void {
    for (const d of this.services){
      this.paragraphs.push(Array(d).fill(1));
    }

    // for (let i = 0; i < this.abouts.length; i++) {
    //   this.paragraphs.push(Array(this.abouts[i]).fill(1));
    // }
  }


  ngOnInit(): void {
    this.initData();
  }

}
