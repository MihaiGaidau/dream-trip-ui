export class Pageable {
  public pageNumber = 0;
  public pageSize = 20;
  public numberOfElements = 1;
  public totalElements = 20;
  public first = true;
  public last = true;


  constructor(pageNumber?: number, pageSize?: number, numberOfElements?: number, totalElements?: number, first?: boolean, last?: boolean) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.numberOfElements = numberOfElements;
    this.totalElements = totalElements;
    this.first = first;
    this.last = last;
  }

}
