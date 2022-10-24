import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /**
   * On init
   */
  ngOnInit(): void {
    console.log('start');
  }
}
