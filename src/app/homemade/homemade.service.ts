import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Homemade } from './homemade.model';

@Injectable({
  providedIn: 'root'
})
export class HomemadeService {
  homemadeListChangedEvent = new Subject<Homemade[]>();
  homemadeSelectedEvent = new EventEmitter<Homemade>();
  homemadeChangedEvent = new EventEmitter<Homemade[]>();
  private homemades: Homemade[] = [];
  maxHomemadeId: number;

  constructor(private http: HttpClient) {
    this.getHomemadeHttp();
   }

   getHomemade(){
     return this.homemades.slice();
   }

   getHomemadeHttp(){
    return this.http
     .get<Homemade[]>('http://localhost:3000/homemades')
     .subscribe(
       //success method
       (homemades:Homemade[]) => {
         this.homemades = homemades;
         this.maxHomemadeId = this.getMaxId();
        //  homemades.sort((a, b) => {
        //    if(a.name > b.name){ return 1; }
        //    if(a.name < b.name){ return -1; }
        //    else { return 0; }
        //   });
            let homemadesListClone = this.homemades.slice();
            this.homemadeListChangedEvent.next(homemadesListClone);
       }
       //error method
       ,(error: any)=> {
         console.log(error.message)
       }
     );
   }

   getHomemadeMeal(id:string){
    for(let homemade of this.homemades){
      if(id == homemade.id){
        return homemade;
      }
    }
    return null!;
   }

  getMaxId(): number {
    let maxId = 0;
    for(let homemade of this.homemades){
        if(parseInt(homemade.id, 10) > maxId){
          maxId = parseInt(homemade.id, 10);
        }
    }
    return maxId;
  }

  addHomemadeMeal(homemade: Homemade) {
    if (!homemade) {
      return;
    }

    homemade.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, homemade: Homemade }>('http://localhost:3000/homemades',
      homemade,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.homemades.push(responseData.homemade);
          this.homemadeListChangedEvent.next(this.homemades.slice());
        }
      );

  }

  updateHomemadeMeal(originalHomemade: Homemade, newHomemade: Homemade) {
    if (!originalHomemade || !newHomemade) {
      return;
    }
    const pos = this.homemades.findIndex(d => d.id === originalHomemade.id);
    if (pos < 0) {
      return;
    }
    newHomemade.id = originalHomemade.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/homemades/' + originalHomemade.id,
    newHomemade, { headers: headers })
      .subscribe(
        () => {
          this.homemades[pos] = newHomemade;
          this.homemadeListChangedEvent.next(this.homemades.slice());
        }
      );

  }

  deleteHomemadeMeal(homemade: Homemade) {
    if (!homemade) {
      return;
    }

    const pos = this.homemades.findIndex(d => d.id === homemade.id);
    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/homemades/' + homemade.id)
      .subscribe(
        () => {
          this.homemades.splice(pos, 1);
          this.homemadeListChangedEvent.next(this.homemades.slice());
          // this.sortAndSend();
        }
      );
  }

  getRandomDinnerIdea(id:string){
    let dinnerIdea = this.homemades[Math.floor(Math.random() * this.homemades.length)];
    return dinnerIdea;
  }

}
