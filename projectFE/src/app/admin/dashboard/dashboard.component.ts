
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as io from "socket.io-client";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chart;
  socket;
  numberOfOnlineUsers: number =0;
  constructor() {
    this.socket = io.connect('http://localhost:4200')
  }
  ngOnInit() {
    this.socket.on('numberOfOnlineUsers', (numberOOU) => {
      this.numberOfOnlineUsers = numberOOU
    })

    this.chart = new Chart('canvas', {
      type: 'bar',
      options: {
        responsive: true,
      },
      data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

        datasets: [
          {
            type: 'bar',
            label: 'số người dùng đăng ký mới',
            data: [10, 0, 4, 0, 12, 15, 5, 8, 3, 16, 11, 3],
            backgroundColor: '#D93A3A',
            fill: false,
          }
        ]

      }
    });

    this.chart = new Chart('canvas2', {
      type: 'bar',
      options: {
        responsive: true,
      },
      data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

        datasets: [
          {
            type: 'bar',
            label: 'số order đc đặt',
            data: [10, 0, 4, 0, 12, 15, 5, 8, 3, 16, 11, 3],
            backgroundColor: '#D93A3A',
            fill: false,
          },

          {
            type: 'bar',
            label: 'số order bị hủy',
            data: [1, 0, 0, 0, 2, 5, 2, 0, 1, 2, 3, 0],
            backgroundColor: '#242424',
            fill: false,
          }
        ]
      }

    });

  }

}
