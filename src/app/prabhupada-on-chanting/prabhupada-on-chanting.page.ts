import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-prabhupada-on-chanting',
  templateUrl: './prabhupada-on-chanting.page.html',
  styleUrls: ['./prabhupada-on-chanting.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PrabhupadaOnChantingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
