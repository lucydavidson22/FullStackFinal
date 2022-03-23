import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SitIn } from './sit-in.model';

@Injectable({
  providedIn: 'root'
})
export class SitInService {
  sitInListChangedEvent = new Subject<SitIn[]>();
  sitInSelectedEvent = new EventEmitter<SitIn>();
  sitInChangedEvent = new EventEmitter<SitIn[]>();
  private sitIns: SitIn[] = [];
  maxSitInId: number;

  constructor(private http: HttpClient) {
    this.getSitInsHttp();
   }

   getSitIns(){
     return this.sitIns.slice();
   }

   getSitInsHttp(){
    return this.http
     .get<SitIn[]>('http://localhost:3000/sitIns')
     .subscribe(
       //success method
       (sitIns:SitIn[]) => {
         this.sitIns = sitIns;
         this.maxSitInId = this.getMaxId();
         sitIns.sort((a, b) => {
           if(a.name > b.name){ return 1; }
           if(a.name < b.name){ return -1; }
           else { return 0; }
          });
            let sitInsListClone = this.sitIns.slice();
            this.sitInListChangedEvent.next(sitInsListClone);
       }
       //error method
       ,(error: any)=> {
         console.log(error.message)
       }
     );
   }

   getSitIn(id:string){
    for(let sitIn of this.sitIns){
      if(id == sitIn.id){
        return sitIn;
      }
    }
    return null!;
   }

  getMaxId(): number {
    let maxId = 0;
    for(let sitIn of this.sitIns){
        if(parseInt(sitIn.id, 10) > maxId){
          maxId = parseInt(sitIn.id, 10);
        }
    }
    return maxId;
  }

  addSitIn(sitIn: SitIn) {
    if (!sitIn) {
      return;
    }
    console.log("Add another sitIn");

    sitIn.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, sitIn: SitIn }>('http://localhost:3000/sitIns',
      sitIn,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new sitIn to sitIns
          console.log('Push new data');
          this.sitIns.push(responseData.sitIn);
          this.sitInListChangedEvent.next(this.sitIns.slice());
          // this.sortAndSend();
        }
      );

  }

  updateSitIn(originalSitIn: SitIn, newSitIn: SitIn) {
    if (!originalSitIn || !newSitIn) {
      return;
    }
    const pos = this.sitIns.findIndex(d => d.id === originalSitIn.id);
    if (pos < 0) {
      return;
    }
    newSitIn.id = originalSitIn.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/sitIns/' + originalSitIn.id,
      newSitIn, { headers: headers })
      .subscribe(
        () => {
          this.sitIns[pos] = newSitIn;
          this.sitInListChangedEvent.next(this.sitIns.slice());
        }
      );

  }

  deleteSitIn(sitIn: SitIn) {
    if (!sitIn) {
      return;
    }

    const pos = this.sitIns.findIndex(d => d.id === sitIn.id);
    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/sitIns/' + sitIn.id)
      .subscribe(
        () => {
          this.sitIns.splice(pos, 1);
          this.sitInListChangedEvent.next(this.sitIns.slice());
          // this.sortAndSend();
        }
      );
  }

}
