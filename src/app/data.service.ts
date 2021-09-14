import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) {

   }

  getSearch(query:any){
    let header = new HttpHeaders().set('Type-content','aplication/json')
    return this.http.get(`http://127.0.0.1/stats/php/search.php?plataform=atvi&query=${query}&autocomplete=true`);
  }
  getUserData(user:any){
    let header = new HttpHeaders().set('Type-content','aplication/json')
    return this.http.get(`http://127.0.0.1/stats/php/UserData.php?user=${user}`,);
  }
  parseUserAlmo(user:any){
    let name = user.split('#')
    return name[0] + "%23" +name[1]
  }
  getPartidasUser(id: any){
    let header = new HttpHeaders().set('Type-content','aplication/json')
    return this.http.get(`http://127.0.0.1/stats/php/Partidas.php?user=${id}`);
  }
  getPartidasUserNext(actUserID:any, next:any) {
    let header = new HttpHeaders().set('Type-content','aplication/json')
      return this.http.get(`http://127.0.0.1/stats/php/Partidas.php?user=${actUserID}&next=${next}`);
  };
  getHistory(actUserID:any) {
    let header = new HttpHeaders().set('Type-content','aplication/json')
      return this.http.get(`http://127.0.0.1/stats/php/History.php?user=${actUserID}`);
  };
  getMatch(matchId:any){
    let header = new HttpHeaders().set('Type-content','aplication/json')
      return this.http.get(`http://127.0.0.1/stats/php/Match.php?MatchId=${matchId}`);
  }

 async getKdChart(datos:any,userId:any){
    var fechaPartidaAnterior = null;
      var bajas= 0;
      var muertes =0;
      var kd;
      var siguiente;
      var contDia = 0;
      var dataBajas = [];
      var dataMuertes = [];
      var dataKD = [];
      var labels = [];
      var retornoDatos;
      siguiente = datos.data.metadata.next;
    for (let i = 0; i < 20; i++) {
      var fechaPartida = this.parseFecha(datos.data.matches[i].metadata.timestamp);
      if (contDia < 7) {
        if (fechaPartidaAnterior == null) {
          
          bajas += datos.data.matches[i].segments[0].stats.kills.value;
          muertes += datos.data.matches[i].segments[0].stats.deaths.value
          
          fechaPartidaAnterior = fechaPartida;
          
        } else if (fechaPartida.getFullYear() == fechaPartidaAnterior.getFullYear() && fechaPartida.getMonth() == fechaPartidaAnterior.getMonth() && fechaPartida.getDate() == fechaPartidaAnterior.getDate()) {
          bajas += datos.data.matches[i].segments[0].stats.kills.value;
          muertes += datos.data.matches[i].segments[0].stats.deaths.value
          fechaPartidaAnterior = fechaPartida;
        } else {
          labels.unshift(fechaPartidaAnterior.getDate() + "-" + fechaPartidaAnterior.getMonth() + "-" + fechaPartidaAnterior.getFullYear()); //Metemos la fecha en el label
          fechaPartidaAnterior = fechaPartida;
          contDia++;
          kd = bajas / muertes;
          dataBajas.unshift(bajas);
          dataMuertes.unshift(muertes);
          dataKD.unshift(kd);
          bajas = 0;
          muertes = 0;
          bajas = datos.data.matches[i].segments[0].stats.kills.value;
          muertes = datos.data.matches[i].segments[0].stats.deaths.value
        };
        
      }
      if (i == datos.data.matches.length - 1 && contDia < 7) {
        datos =  await this.getPartidasUserNext(userId, siguiente).toPromise()
        console.log(datos)
        siguiente = datos.data.metadata.next;
        i =-1;
      }
      
      if (contDia == 5) {
        
        
      };
      
      
   };
   retornoDatos ={
     kills : dataBajas,
     deaths : dataMuertes,
     kd: dataKD,
     labels : labels
   }
   console.log(retornoDatos)
   
   return retornoDatos;
  }

searchTeam(team:any,id:any){
  let nombre = id.split("#")
  
  for (let i = 0; i < team.length; i++) {
    
    for (let j = 0; j < team[i].length; j++) {
      console.log(team[i][j].name.toUpperCase() +" "+ nombre[0].toUpperCase())
      if (team[i][j].name.toUpperCase() == nombre[0].toUpperCase()) {
        
        
        
        return team[i]
      
      }
      
    }
    
  }
}

  parseFecha(fechaRecivida:any){
    var fecha = fechaRecivida.split("T");
   
    var fec = new Date(fecha);
    fec.setMinutes(fec.getMinutes()+27)
    
    return fec;
  }
calcColor(liga:any){
  if(liga == "LEGEND"){
    liga = "LEGEND"
  }else if(liga == "MASTER"){
    liga = "MASTER"
  }else if(liga == "DIAMOND 1" || liga == "DIAMOND 2" || liga == "DIAMOND 3" || liga == "DIAMOND 4"){
    liga = "DIAMOND"
  }else if(liga == "PLATINUM 1" || liga == "PLATINUM 2" || liga == "PLATINUM 3" || liga == "PLATINUM 4"){
    liga = "PLATINUM"
  }else if(liga == "GOLD 1" || liga == "GOLD 2" || liga == "GOLD 3" || liga == "GOLD 4"){
    liga = "GOLD"
  } else if(liga == "SILVER 1" || liga == "SILVER 2" || liga == "SILVER 3" || liga == "SILVER 4"){
    liga = "SILVER"
  }else if(liga == "BRONZE 1" || liga == "BRONZE 2" || liga == "BRONZE 3" || liga == "BRONZE 4"){
    liga = "BRONZE"
  }
  return liga
}
teamKills(team:any){
  let kills = 0;
  for (let i = 0; i< team.length; i++) {
    kills += team[i].stats.kills.value
  }
  return kills;
}
teamKdAvg(team:any){
 
    let kdTotal = 0
    for (let i = 0; i < team.length; i++) {
      
      kdTotal += team[i].userKd;
    };
    if (kdTotal == 0) {
      return "-"
    }else{
      return Math.round((kdTotal / team.length + Number.EPSILON) * 100) / 100
    }
    

}

pullApartTeams(data:any){
 let content = []
 let state = false
  let divisionMedia = 1;
  let team = []
  let avgKd;
  for (let i = 0; i < data.segments.length;) {

    try{
      team.push({
        userKd: data.segments[i].attributes.lifeTimeStats.kdRatio,
        placement: data.segments[i].stats.teamPlacement.value,
        name : data.segments[i].metadata.platformUserHandle,
        stats:data.segments[i].stats
      });
     
    }catch{
      team.push({
        userKd: 0,
        placement: data.segments[i].stats.teamPlacement.value,
        name : data.segments[i].metadata.platformUserHandle,
        stats:data.segments[i].stats
      });
    }
    
 
      for (let j = i+1; j < data.segments.length; j++) {
        console.log( i +" " +j)
       console.log(team[0].placement + " " + data.segments[j].stats.teamPlacement.value)
        if (team[0].placement == data.segments[j].stats.teamPlacement.value) {
          try{
            team.push({
              userKd: data.segments[j].attributes.lifeTimeStats.kdRatio,
              placement: data.segments[j].stats.teamPlacement.value,
              name : data.segments[j].metadata.platformUserHandle,
              stats:data.segments[j].stats
            });
          }catch{
            team.push({
              userKd: 0,
              placement: data.segments[j].stats.teamPlacement.value,
              name : data.segments[j].metadata.platformUserHandle,
              stats:data.segments[j].stats
            });
          }
          

        }else{
          
          content.push(team)
          team = []
          i = j;
          j = data.segments.length+1;

      }
      if (j == data.segments.length - 1) {
        i = j;
      }
      
  }    

if (i == (data.segments.length - 1) ) {
            i = data.segments.length;
}
  
}
return content;
}



calcPercentile(n:any){
//probar aqui la optimizacion de codigo. 
//La idea: que estos inyecten el color de texto y del backgroud y retorne el texto de la liga

  let liga;
    n= 100 - n;
    if(n >= 0 && n < 1){
      liga = "LEGEND";
    }else if(n >= 1 && n < 5){
      liga = "MASTER";
    }else if(n >= 5 && n < 10){
      liga = "DIAMOND 1";
    }else if(n >= 10 && n < 15){
      liga = "DIAMOND 2";
    }else if(n >= 15 && n < 20){
      liga = "DIAMOND 3";
    }else if(n >= 20 && n < 25){
      liga = "DIAMOND 4";
    }else if(n >= 25 && n < 30){
      liga = "PLATINUM 1";
    }else if(n >= 30 && n < 35){
      liga = "PLATINUM 2";
    }else if(n >= 35 && n < 40){
      liga = "PLATINUM 3";
    }else if(n >= 40 && n < 45){
      liga = "PLATINUM 4";
    }else if(n >= 45 && n < 50){
      liga = "GOLD 1";
    }else if(n == 50){
      liga = "GOLD 2";
    }else if(n > 50 && n < 55){
      liga = "GOLD 3";
    }else if(n >= 55 && n < 60){
      liga = "GOLD 4";
    }else if(n >= 60 && n < 65){
      liga = "SILVER 1";
    }else if(n >= 65 && n < 70){
      liga = "SILVER 2";
    }else if(n >= 70 && n < 75){
      liga = "SILVER 3";
    }else if(n >= 75 && n < 80){
      liga = "SILVER 4";
    }else if(n >= 80 && n < 85){
      liga = "BRONZE 1";
    }else if(n >= 85 && n < 90){
      liga = "BRONZE 2";
    }else if(n >= 90 && n < 95){
      liga = "BRONZE 3";
    }else if(n >= 95 && n < 100){
      liga = "BRONZE 4";
    } 
  
  return liga
  
}
}
