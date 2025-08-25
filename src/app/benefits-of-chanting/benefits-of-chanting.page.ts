import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-benefits-of-chanting',
  templateUrl: './benefits-of-chanting.page.html',
  styleUrls: ['./benefits-of-chanting.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class BenefitsOfChantingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
