import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public abouts: number[] = [1, 1, 1];
  public paragraphs: number[][] = [];
  public list: string[];

  constructor() {
  }

  /** add terms array */
  private initData(): void {
    for (const d of this.abouts){
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
