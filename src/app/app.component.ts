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
  desiredDiet: any = "";
  desiredCategory: any = "";

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
    this.desiredCategory = $event.value;
    console.log("event value is ", this.desiredCategory);
    let filteredRecipes = _.filter(this.originalApiResponseRecipes,(item) => {
      return (item.categories.toLowerCase().includes(this.desiredCategory) &&
      item.diet.toLowerCase().includes(this.desiredDiet))
    });

    if (this.desiredCategory == "") {
      filteredRecipes = _.filter(this.originalApiResponseRecipes,(item) => {
        return (item.diet.toLowerCase().includes(this.desiredDiet))
      });
    }

    this.recipes = filteredRecipes;
  }


  onChangeDietFilter($event: MatSelectChange) {
    this.desiredDiet = $event.value;
    console.log("event value is ", this.desiredDiet);
    
    let filteredRecipes = _.filter(this.originalApiResponseRecipes,(item) => {
      return (item.categories.toLowerCase().includes(this.desiredCategory) &&
      item.diet.toLowerCase().includes(this.desiredDiet))
    });

    if (this.desiredDiet == "") {
      filteredRecipes = _.filter(this.originalApiResponseRecipes,(item) => {
        return (item.categories.toLowerCase().includes(this.desiredCategory))
      });
    }

    this.recipes = filteredRecipes;
  }



}


