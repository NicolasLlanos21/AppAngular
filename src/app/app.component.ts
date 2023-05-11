import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { RestService } from './rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'anguarFront';
  data:any;
  dataSum:any;
  hostname = window.location.hostname;
  time = window.location.pathname;
  time2 = "";

  constructor(private RestService: RestService){
    interval(1000).subscribe(() => {this.cargarData();});
  }

  ngOnInit():void{
    const source = interval(1000); // Intervalo de 1 segundo
    const subscribe = source.subscribe(() => {
      this.updateTime(); // Actualizar la hora cada segundo
    });
    this.cargarData();
    this.cargarDataSumas();
  }

  public cargarData(){
    this.RestService.get(`http://10.4.73.210:30111/`).subscribe(respuesta =>{
      this.data = respuesta;
    })
  }

  public cargarDataSumas(){
    this.RestService.get(`http://10.4.73.210:30009/`).subscribe(respuesta =>{
      this.dataSum = respuesta;
    })
  }

  updateTime() {
    const date = new Date();
    const time = date.toLocaleTimeString();
    const time2 = date.toLocaleDateString();
    this.time = time; // Actualizar la hora en la propiedad 'time'
    this.time2 = time2;
    console.log('La hora actual es:', time);
  }
}
