import { Ingredient } from "./Ingredient";

export class FullResponse {
    recipe: RecipeInfo;
    image: ImageInfo;
    recipeID: number;

    constructor(recipe: RecipeInfo, image: ImageInfo, recipeID: number) {
        this.recipe = recipe;
        this.image = image;
        this.recipeID = recipeID;
    }
}

export class RecipeInfo {
    title: string;
    categories: string;
    diet: string;
    protein: string;
    numIngredients: string;
    yield: string;
    prepTime: string;
    cookTime: string;
    totalTime: string;
    ingredients: Ingredient;
    directions: string;
    pictureUrl: string;

    constructor(data?: {title:any; categories:any; diet: any; protein:any; numIngredients:any; yield:any; prepTime:any; cookTime:any; totalTime:any; ingredients:any; directions:any; pictureUrl:any;}) {
        this.title = data?.title;
        this.categories = data?.categories;
        this.diet = data?.diet;
        this.protein = data?.protein;
        this.numIngredients = data?.numIngredients;
        this.yield = data?.yield;
        this.prepTime = data?.prepTime;
        this.cookTime = data?.cookTime;
        this.totalTime = data?.totalTime;
        this.ingredients = data?.ingredients;
        this.directions = data?.directions;
        this.pictureUrl = data?.pictureUrl;
    }
}

export class ImageInfo {
    fileName: string;
    base64FileName: string;
    url: string;
    localPath: string;

    constructor(fileName: string, base64FileName: string, url: string, localPath: string) {
        this.fileName = fileName;
        this.base64FileName = base64FileName;
        this.url = url;
        this.localPath = localPath;
    }
}