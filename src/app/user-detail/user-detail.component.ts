import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataService} from '../data.service'
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  matchesDataChart:any
  chart:any;
  chartLine:any
  chartPrincipal: any
  chartKdRatioData:any
  mainChartData:any;
  killsChart:any

  userHistory:any

  userData:any
  userId:any
  userName:any;
  userKD:any;
  userKDBg:any
  userKDLiga:any
  userWins:any;
  userWinsBg:any
  userWinsLiga:any
  userWeekKD:any;
  userWeekKDBg:any;
  userWeekKDLiga:any
  userKills:any;
  userKillsLiga:any
  userKillsBg:any
  userRatioWins:any;
  userRatioWinsLiga:any
  userRatioWinsBg:any;
  userScoreMin:any;
  userScoreMinLiga:any
  userScoreMinBg:any
  userTop10:any;
  userTop10Liga:any
  userTop10Bg:any
  userDeaths:any;

  
  
  matchOverview:any
  matchesData :any
  matchGulaj:any
  
  chartWeekData:any
  constructor(private route:ActivatedRoute, public data : DataService){

  }
  ngOnInit(): void {
    /*Recogemos el historial para los gráficos 1 - 3 */
     
    
 
    this.userId= this.data.parseUserAlmo(this.route.snapshot.paramMap.get('id'))//Solicitamos datos del usuario recogiendo el id de la url
    this.getMatches();
    this.loadUserHistory();
    this.loadUserData();
    
    
  }
  getKdRatioChart(userHistory:any){
    let label = [];
    let data =[];
    let allData;
    for (let i = 0; i < userHistory.data.series.ScorePerMinute.data.length; i++) {
     label.push(this.data.parseFecha(userHistory.data.series.kdRatio.data[i][0]).toLocaleDateString());
     data.push(userHistory.data.series.kdRatio.data[i][1].value);
    }
    allData = {
      label : label,
      value : data
    }
    return allData
  }
  getMainChart(userHistory:any){
    let label = [];
    let data =[];
    let allData;
    for (let i = 0; i < userHistory.data.series.ScorePerMinute.data.length; i++) {
     label.push(this.data.parseFecha(userHistory.data.series.ScorePerMinute.data[i][0]).toLocaleDateString());
     data.push(userHistory.data.series.ScorePerMinute.data[i][1].value);
    }
    allData = {
      label : label,
      value : data
    }
    return allData
  }
  getKillsChart(userHistory:any){
    let label = [];
    let data =[];
    let allData;
    for (let i = 0; i < userHistory.data.series.ScorePerMinute.data.length; i++) {
     label.push(this.data.parseFecha(userHistory.data.series.Kills.data[i][0]).toLocaleDateString());
     data.push(userHistory.data.series.Kills.data[i][1].value);
    }
    allData = {
      label : label,
      value : data
    }
    return allData
  }
  loadUserData(){
    this.data.getUserData(this.userId).subscribe(datos => {
      let userSinId = this.userId.split('%23') //Solo cogemos el nombre para el titulo del slide
      this.userData = datos;
      console.log(this.userData);
      this.userName = userSinId[0];

      this.userKD = this.userData.data.segments[1].stats.kdRatio.displayValue
      this.userKDLiga = this.data.calcPercentile(this.userData.data.segments[1].stats.kdRatio.percentile)
      this.userKDBg = this.data.calcColor(this.userKDLiga)

      this.userWins = this.userData.data.segments[1].stats.wins.displayValue
      this.userWinsLiga = this.data.calcPercentile(this.userData.data.segments[1].stats.wins.percentile)
      this.userWinsBg = this.data.calcColor(this.userWinsLiga)
      

      this.userWeekKD = this.userData.data.segments[1].stats.weeklyKdRatio.displayValue
      this.userWeekKDLiga = this.data.calcPercentile(this.userData.data.segments[1].stats.weeklyKdRatio.percentile)
      this.userWeekKDBg =this.data.calcColor(this.userWeekKDLiga)

      this.userKills = this.userData.data.segments[1].stats.kills.displayValue
      this.userKillsLiga = this.data.calcPercentile(this.userData.data.segments[1].stats.kills.percentile)
      this.userKillsBg =this.data.calcColor(this.userKillsLiga)

      this.userRatioWins = this.userData.data.segments[1].stats.wlRatio.value
      this.userRatioWinsLiga = this.data.calcPercentile(this.userData.data.segments[1].stats.wlRatio.percentile)
      this.userRatioWinsBg = this.data.calcColor(this.userRatioWinsLiga)

      this.userScoreMin = this.userData.data.segments[1].stats.scorePerMinute.displayValue
      this.userScoreMinLiga = this.data.calcPercentile(this.userData.data.segments[1].stats.scorePerMinute.percentile)
      this.userScoreMinBg = this.data.calcColor(this.userScoreMinLiga)

      this.userTop10 = this.userData.data.segments[1].stats.top10.displayValue
      this.userTop10Liga = this.data.calcPercentile(this.userData.data.segments[1].stats.top10.percentile)
      this.userTop10Bg = this.data.calcColor(this.userTop10Liga)
      this.userDeaths = this.userData.data.segments[1].stats.deaths.displayValue
    })
  }
  loadChart(){
    new Chart(this.chart,{ // 
      type: 'bar',
      data: {
          labels: this.killsChart.label,
          datasets: [{
              label: 'KILLS',
              data: this.killsChart.value,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        plugins: {
          title:{
            display: true,
            text: 'KILLS',
            color: "white",
            font: {
              family: 'Roboto',
              size: 16
            }
          },
          legend: {
            
            display : false
          },
        },
          interaction: {
              mode: 'x',
              intersect: false,
          },
          scales: {
              x: {
                ticks:{
                  color: "gray"
                }
              },
              y: {
                ticks:{
                  color: "white"
                },
                   grid: {
                      drawOnChartArea: false,
                      drawTicks: false,
                  }
              }
          }
      }
  })
  }
  loadChartLine(){ //EL CHART DE PROGRESO SEMANAL 
    new Chart(this.chartLine, {
      type: 'line',
      data: {
        
        labels: [this.chartWeekData.labels[0], this.chartWeekData.labels[1], this.chartWeekData.labels[2], this.chartWeekData.labels[3],this.chartWeekData.labels[4], this.chartWeekData.labels[5],this.chartWeekData.labels[6]],
          datasets: [{
              label: 'Bajas',
              
            data: [this.chartWeekData.kills[0],this.chartWeekData.kills[1], this.chartWeekData.kills[2], this.chartWeekData.kills[3], this.chartWeekData.kills[4], this.chartWeekData.kills[5] ,this.chartWeekData.kills[6]],
              backgroundColor: 
                  'rgba(0,255,255, 1)',

              borderColor: 
                  'rgba(0,255,255, 1)',
              cubicInterpolationMode: 'monotone',
              borderWidth: 4
          },
      {
                  label: 'Muertes',
                  data: [this.chartWeekData.deaths[0], this.chartWeekData.deaths[1], this.chartWeekData.deaths[2], this.chartWeekData.deaths[3], this.chartWeekData.deaths[4], this.chartWeekData.deaths[5], this.chartWeekData.deaths[6]],
                  backgroundColor: 
                      'rgba(255, 99, 132, 1)',
                  borderColor: 
                      'rgba(255, 99, 132, 1)',
                  borderWidth: 4,
                  cubicInterpolationMode: 'monotone'
              },
          {
                  label: 'KD',
                  data: [this.chartWeekData.kd[0], this.chartWeekData.kd[1], this.chartWeekData.kd[2], this.chartWeekData.kd[3], this.chartWeekData.kd[4], this.chartWeekData.kd[5], this.chartWeekData.kd[0]],
                  backgroundColor: 
                      'rgba(255, 99, 132, 0)',
                  borderColor: 
                      'rgba(255, 99, 132, 0)',
                  borderWidth: 1
              }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'DIARIO K/D',
            color: "white",
            font: {
              family: 'Roboto',
              size: 16
            }
          },
          legend: {
            display : false
          },
        },
          interaction: {
              mode: 'x',
              intersect: false,
          },
          scales: {
              x: {
                ticks:{
                  color: "white"
                }
              },
              y: {
                ticks:{
                  color: "white"
                },
                   grid: {
                      drawOnChartArea: false,
                      drawTicks: false,
                  }
              }
          }
      }
  })
  }
  loadChartPrincipal(){ //MAIN CHART, EL CHART GRANDE EN LA PRIMERA LINEA
    new Chart(this.chartPrincipal, {
      type: 'line',
      data: {
        labels: this.mainChartData.label,
          datasets: [{
              label: 'Bajas',
              
            data: this.mainChartData.value,
              backgroundColor: 
              'rgba(0,255,255, 1)',

              borderColor: 
              'rgba(0,255,255, 1)',
              cubicInterpolationMode: 'monotone',
              borderWidth: 4
          }]
      },
      options: {
        plugins: {
          title:{
            display: true,
            text: 'EVOLUTION SCORE/MIN',
            color: "white",
            font: {
              family: 'Roboto',
              size: 16
            }
          },
          legend: {
            display : false
          },
        },
          interaction: {
              mode: 'x',
              intersect: false,
          },
          scales: {
              x: {
                ticks:{
                  color: "white"
                }
              },
              y: {
                ticks:{
                  color: "white"
                },
                   grid: {
                      drawOnChartArea: false,
                      drawTicks: false,
                  }
              }
          }
      }
  })
  }
  getMatches(){
    this.data.getPartidasUser(this.userId).subscribe(async matches =>{
      this.matchesDataChart = matches;
      this.matchesData = this.matchesDataChart.data.matches
      console.log(this.matchesData)
      this.chartPrincipal = document.getElementById('canvasPrincipal')
      Chart.register(...registerables)
      this.loadChartPrincipal();
      
      this.chart = document.getElementById('canvas')
      Chart.register(...registerables)
      this.loadChart();

      this.chartWeekData = await this.data.getKdChart(this.matchesDataChart,this.userId);
      this.chartLine = document.getElementById('canvasLine')
      Chart.register(...registerables)
      this.loadChartLine();
    
    })
  }
  loadUserHistory(){
    this.data.getHistory(this.userId).subscribe(data =>{
      this.userHistory = data;
      console.log(data);
    this.mainChartData = this.getMainChart(this.userHistory);
    this.killsChart = this.getKillsChart(this.userHistory)
    });
  }
  getMatch(matchId:any,per:any){
    location.href = `matchDetail/${per}/${this.userId}/${matchId}`;
  }
}
          
          
     
                   
                  
    
    
