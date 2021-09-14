import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  matchResponse:any
  matchKdAvg:any
  matchTime:any
  matchLeague:any
  matchModeTitle:any
  bgLeage:any
  matchTeams :any
  yourTeam:any
  userId:any
  constructor(private route:ActivatedRoute, public data : DataService) { }

  ngOnInit(): void {
    this.data.getMatch(this.route.snapshot.paramMap.get('matchId')).subscribe(dataMatch =>{
      this.matchResponse = dataMatch;
      
      this.userId = this.route.snapshot.paramMap.get('idUser');
      this.matchResponse = this.matchResponse.data
      this.matchKdAvg= Math.round((this.matchResponse.attributes.avgKd.avgKd + Number.EPSILON) * 100) / 100 /*Funcion para redondear solo los decimales*/ 
      this.matchLeague = this.data.calcPercentile(this.route.snapshot.paramMap.get('per'))
      this.matchTime = this.matchResponse.metadata.duration.displayValue
      this.matchModeTitle = this.matchResponse.metadata.modeName;
      this.matchTeams = this.data.pullApartTeams(this.matchResponse);
      this.yourTeam = this.data.searchTeam(this.matchTeams, this.userId)
      console.log(this.yourTeam)
      
      this.bgLeage = this.data.calcColor(this.matchLeague);
      console.log(this.bgLeage)
      console.log(this.matchResponse);
      console.log(this.matchTeams)
    })
  }

}
