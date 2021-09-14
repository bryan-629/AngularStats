import { HtmlTagDefinition } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public dataService:any= [];
  constructor(private data : DataService) { }

  ngOnInit(): void {
  }
  changeInput(event :Event){
   var evento =<HTMLInputElement>event.target
    console.log(evento.value)
    this.data.getSearch(evento.value).subscribe(datos=>{
      this.dataService = datos;
      
      
    })
  }
  onClick(name : string){
    location.href =`userDetail/${this.data.parseUserAlmo(name)}`
  }
}
