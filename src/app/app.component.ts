import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng check image check box';
  public cities:any = [
    {value:"Casablanca",url:"https://preview.ibb.co/nHJ0JR/433832590_Casablanca_Morocco_Vacations.jpg"},
    {value:"Paris",url:"https://preview.ibb.co/cCJaJR/ct_paris_city_of_romance_20170601.jpg"},
    {value:"New York",url:"https://image.ibb.co/jZH2yR/NY.jpg"}
  ];
  public chosenCities:any[] = [];
}
