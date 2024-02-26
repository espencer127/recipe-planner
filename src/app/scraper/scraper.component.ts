import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpService } from '../HttpService';
import { FullResponse, ImageInfo, RecipeInfo } from '../FullResponse';
import { Ing } from '../Ing';
import { Amount } from '../Amount';
import { Ingredient } from '../Ingredient';

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
  insertRequestPayload!: FullResponse;

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
    pictureUrl: [''],
    fileName: [''],
    base64FileName: [''],
    url: [''],
    localPath: ['']
  });

  constructor(private httpService: HttpService, private fb: FormBuilder) {}

  sendScrapeRequest() {
    console.log(this.scrapeRequestForm.value);
    this.scrapeRequestSubmitted = true;

    //TODO: do we need to trim all the whitespace before throwing them into the mat boxes?
    //TODO: WE SHOULD BE GETTING THE 'NOTES' BACK FOR EACH INGREDIENT

    //TODO: we need to either initialize with an empty ingredient array or something

    //TODO: better error handling if we get something bad back from server?

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

        if (typeof this.scrapedRecipe.image?.fileName !== 'undefined') {
          this.recipePayload.get('fileName')?.setValue(this.scrapedRecipe.image.fileName);
        }
        if (typeof this.scrapedRecipe.image?.base64FileName !== 'undefined') {
        this.recipePayload.get('base64FileName')?.setValue(this.scrapedRecipe.image.base64FileName);
        }
        if (typeof this.scrapedRecipe.image?.url !== 'undefined') {
        this.recipePayload.get('url')?.setValue(this.scrapedRecipe.image.url);
        }
        if (typeof this.scrapedRecipe.image?.localPath !== 'undefined') {
        this.recipePayload.get('localPath')?.setValue(this.scrapedRecipe.image.localPath);
        }

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

  sendInsertRequest() {
    //console.log("first gotta convert the recipePayload to an object type FullResponse")

    let postIngArr: Array<Ing> = [];

    for (let index = 0; index < this.ingredients.value.length; index++) {
      const element = this.ingredients.value[index];
      let tempAmt: Amount = new Amount(element.qty, element.unit);
      postIngArr.push(new Ing(tempAmt, element.item));
    }

    let tempIng: Ingredient = new Ingredient(postIngArr);

    let recInf:RecipeInfo = new RecipeInfo(
      this.recipePayload.get('title')?.value,
      this.recipePayload.get('categories')?.value,
      this.recipePayload.get('diet')?.value,
      this.recipePayload.get('protein')?.value,
      this.recipePayload.get('numIngredients')?.value,
      this.recipePayload.get('yield')?.value,
      this.recipePayload.get('prepTime')?.value,
      this.recipePayload.get('cookTime')?.value,
      this.recipePayload.get('totalTime')?.value,
      tempIng,
      this.recipePayload.get('directions')?.value,
      this.recipePayload.get('pictureUrl')?.value
    );

    //TODO: i have no idea why i can't make a populated imageinfo object
    let imgInf:ImageInfo = new ImageInfo();

    let postBody:FullResponse = new FullResponse(recInf, imgInf);

    console.log("the insert request payload is gonna be ", JSON.stringify(recInf));

    this.httpService.insertRecipe(postBody).subscribe(
      (response) => {
        console.log("we got the response" + response);
      }
    );
  }

  get ingredients():FormArray{
    return <FormArray> this.recipePayload.get('ingredients');
  }

  createIng(inputItem:string, inputQty:string, inputUnit:string):FormGroup{
    return this.fb.group({
      item:[inputItem],
      qty: [inputQty],
      unit: [inputUnit]
    })
  }

}
