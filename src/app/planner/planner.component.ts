import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpService } from '../HttpService';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import * as _ from 'lodash';
import { Recipe } from '../Recipe';
import { Ing } from '../Ing';
import { RecipeList } from '../RecipeList';
import { ShoppingList } from '../ShoppingList';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatToolbarModule, MatInputModule, MatSelectModule, MatCheckboxModule, FormsModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.css'
})
export class PlannerComponent implements OnInit {
  title = 'recipe-planner';
  recipeList: any;
  recipes: any;
  originalApiResponseRecipes: any;
  desiredDiet: any = "";
  desiredCategory: any = "";
  recipeGridVisible: boolean = true;
  generateShoppingListButtonVisible: boolean = true;
  shoppingListVisible: boolean = false;
  recipesToCookThisWeek: Recipe[] = [];
  recList: RecipeList = new RecipeList;
  shoppingList: ShoppingList = new ShoppingList;

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

  toggleSelection($event: MatCheckboxChange,recipe: Recipe) {
    if ($event.checked) {
      this.recipesToCookThisWeek.push(recipe)
    } else {
      let newArray = this.recipesToCookThisWeek.filter((e, i) => e.title !== recipe.title); 
      this.recipesToCookThisWeek = newArray;
    }
    console.log("recipes to cook this week are: ", JSON.stringify(this.recipesToCookThisWeek))
  }

  
  displayShoppingList() {

    this.recList = new RecipeList(this.recipesToCookThisWeek);

    this.httpService.getShoppingList(this.recList).subscribe(
      (response) => {
        this.shoppingList = response;
        console.log("the shopping list for these recipes is ", JSON.stringify(this.shoppingList));
      }
    )

    this.recipeGridVisible = false;
    this.shoppingListVisible = true;
    this.generateShoppingListButtonVisible = false;

  }

}


