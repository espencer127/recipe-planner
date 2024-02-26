import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpService } from '../HttpService';
import { FullResponse } from '../FullResponse';
import { Ing } from '../Ing';

@Component({
  selector: 'app-scraper',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, TextFieldModule],
  templateUrl: './scraper.component.html',
  styleUrl: './scraper.component.css'
})

export class ScraperComponent {
  scrapeRequestSubmitted: boolean = false;
  scrapeResponseReceived: boolean = false;
  scrapedRecipe!: FullResponse;

  scrapeRequestForm = new FormGroup({
    scrapeUrl: new FormControl('')
  });

  recipePayload = this.fb.group({
    title: [''],
    categories: [''],
    diet: [''],
    protein: [''],
    numIngredients: [''],
    yield: [''],
    prepTime: [''],
    cookTime: [''],
    totalTime: [''],
    ingredients: this.fb.array([
      this.fb.group({
        item: [''],
        qty: [''],
        amount: ['']
      })
    ]),
    directions:[''],
    pictureUrl: ['']
  });

  rpp = new FormGroup({
    title: new FormControl(''),
    categories: new FormControl(''),
    diet: new FormControl(''),
    protein: new FormControl(''),
    numIngredients: new FormControl(''),
    yield: new FormControl(''),
    prepTime: new FormControl(''),
    cookTime: new FormControl(''),
    totalTime: new FormControl(''),
    ingredients: new FormGroup([]), //FormControl(),
    directions: new FormControl(''),
    pictureUrl: new FormControl('')
  });

  constructor(private httpService: HttpService, private fb: FormBuilder) {}

  sendScrapeRequest() {
    console.log(this.scrapeRequestForm.value);
    this.scrapeRequestSubmitted = true;

    this.httpService.scrapeRecipe(this.scrapeRequestForm.get('scrapeUrl')?.value).subscribe(
      (response) => {
        this.scrapeResponseReceived = true;
        this.scrapedRecipe = response;
        console.log("Got back " + JSON.stringify(this.scrapedRecipe))

        this.recipePayload.get('title')?.setValue(this.scrapedRecipe.recipe.title);
        this.recipePayload.get('categories')?.setValue(this.scrapedRecipe.recipe.categories);
        this.recipePayload.get('diet')?.setValue(this.scrapedRecipe.recipe.diet);
        this.recipePayload.get('protein')?.setValue(this.scrapedRecipe.recipe.protein);
        this.recipePayload.get('numIngredients')?.setValue(this.scrapedRecipe.recipe.numIngredients);
        this.recipePayload.get('yield')?.setValue(this.scrapedRecipe.recipe.yield);
        this.recipePayload.get('prepTime')?.setValue(this.scrapedRecipe.recipe.prepTime);
        this.recipePayload.get('cookTime')?.setValue(this.scrapedRecipe.recipe.cookTime);
        this.recipePayload.get('totalTime')?.setValue(this.scrapedRecipe.recipe.totalTime);
        this.recipePayload.get('directions')?.setValue(this.scrapedRecipe.recipe.directions);
        this.recipePayload.get('pictureUrl')?.setValue(this.scrapedRecipe.recipe.pictureUrl);
        
        if (this.scrapedRecipe.recipe.ingredients.ing.length > 0) {

          let incomingIngArr:Ing[] = this.scrapedRecipe.recipe.ingredients.ing;
          
          for (let index = 0; index < this.scrapedRecipe.recipe.ingredients.ing.length; index++) {
            let ingredient = (this.createIng(incomingIngArr[index].item, incomingIngArr[index].amt.qty, incomingIngArr[index].amt.unit));
            this.ingredients.push(ingredient);
          }

          console.log("the ingredients now has the structure of ", this.recipePayload.get('ingredients'))

        }

      }
    )
  }

  get ingredients():FormArray{
    return <FormArray> this.recipePayload.get('ingredients');
  }

  sendInsertRequest() {
    console.log("one day i will do things. today is not that day")
  }

  createIng(inputItem:string, inputQty:string, inputUnit:string):FormGroup{
    return this.fb.group({
      item:[inputItem],
      qty: [inputQty],
      unit: [inputUnit]
    })
  }

}
