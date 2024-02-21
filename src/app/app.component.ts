import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpService } from './HttpService';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatToolbarModule, MatInputModule, MatSelectModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'recipe-planner';
  recipeList: any;
  recipes: any;
  originalApiResponseRecipes: any;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getRecipes().subscribe(
      (response) => {
        this.recipeList = response;
        console.log("the object is " + JSON.stringify(this.recipeList));
        this.recipes = this.recipeList.recipes;
        this.originalApiResponseRecipes = this.recipes;
      }
    )

  }


  onChangeCategoryFilter($event:any) {
    console.log("event value is ", $event.value);
    let filteredRecipes = _.filter(this.originalApiResponseRecipes,(item) => {
      return item.categories.toLowerCase().includes($event.value)
    });

    if ($event.value == "") {
      filteredRecipes = this.originalApiResponseRecipes;
    }

    this.recipes = filteredRecipes;

  }


  onChangeDietFilter($event: MatSelectChange) {
    console.log("event value is ", $event.value);
    let filteredRecipes = _.filter(this.originalApiResponseRecipes,(item) => {
      return item.diet.toLowerCase().includes($event.value)
    });

    if ($event.value == "") {
      filteredRecipes = this.originalApiResponseRecipes;
    }

    this.recipes = filteredRecipes;
    }



}


