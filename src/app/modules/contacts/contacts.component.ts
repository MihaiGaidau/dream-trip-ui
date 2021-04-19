import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public contacts: number[] = [1, 1];
  public paragraphs: number[][] = [];
  public list: string[];

  constructor() { }

  /** add terms array */
  private initData(): void {
    for (const d of this.contacts){
      this.paragraphs.push(Array(d).fill(1));
    }
  }


  ngOnInit(): void {
    this.initData();
  }

}
