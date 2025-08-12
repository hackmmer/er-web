import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';


@Component({
  selector: 'app-home',
  imports: [RouterLink, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router){

  }
}
