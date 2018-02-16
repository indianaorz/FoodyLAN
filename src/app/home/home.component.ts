import { Component, OnInit } from '@angular/core';
import {trigger,style,transition,animate,keyframes,query,stagger} from '@angular/animations';
import {DataService} from '../data.service';
import { NgZone, Injectable, Optional } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('goals',[
      transition('* => *',[
        query(':enter',style({opacity:0}), {optional:true}),

        query(':enter',stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity: 0, transform: 'translateY(-75%)',offset: 0}),
            style({opacity: .5, transform: 'translateY(20%)',offset: .5}),
            style({opacity: 1, transform: 'translateY(0)',offset: 1})
          ]))]), {optional:true}),
          
          query(':leave',stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity: 1, transform: 'translateY(0)',offset: 0}),
            style({opacity: .5, transform: 'translateY(20%)',offset: .5}),
            style({opacity: 0, transform: 'translateY(-75%)',offset: 1})
          ]))]), {optional:true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add an item'
  goalText: string = "My first life goal"
  goals = [];
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  addItem(){
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  removeItem(i){
    this.goals.splice(i,1);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
}
