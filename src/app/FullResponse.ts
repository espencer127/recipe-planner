import { Ingredient } from "./Ingredient";

export class FullResponse {
    recipe: RecipeInfo;
    image: ImageInfo | undefined;
    recipeID: number | undefined;

    constructor(recipe: RecipeInfo, image?: ImageInfo, recipeID?: number) {
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

    constructor(title:any, categories:any, diet: any, protein:any, numIngredients:any, recipYield:any, prepTime:any, cookTime:any, totalTime:any, ingredients:any, directions:any, pictureUrl:any) {
        this.title = title;
        this.categories = categories;
        this.diet = diet;
        this.protein = protein;
        this.numIngredients = numIngredients;
        this.yield = recipYield;
        this.prepTime = prepTime;
        this.cookTime = cookTime;
        this.totalTime = totalTime;
        this.ingredients = ingredients;
        this.directions = directions;
        this.pictureUrl = pictureUrl;
    }

    public set setTitle(title: string) {
        this.title = title;
    }

    public set setCategories(v : string) {
        this.categories = v;
    }

    public set setDiet(v : string) {
        this.diet = v;
    }

    public set setProtein(v : string) {
        this.protein = v;
    }
    
    public set setNumIngredients(v : string) {
        this.numIngredients = v;
    }
    
    public set setYield(v : string) {
        this.yield = v;
    }
    
    public set setPrepTime(v : string) {
        this.prepTime = v;
    }
    
    public set setCookTime(v : string) {
        this.cookTime = v;
    }
    
    public set setTotalTime(v : string) {
        this.totalTime = v;
    }
    
    public set setDirections(v : string) {
        this.directions = v;
    }
    
    public set setPictureUrl(v : string) {
        this.pictureUrl = v;
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
    
    public set setFileName(v : string) {
        this.fileName = v;
    }
    
    public set setBase64FileName(v : string) {
        this.base64FileName = v;
    }
    
    public set setUrl(v : string) {
        this.url = v;
    }
    
    public set setLocalPath(v : string) {
        this.localPath = v;
    }
    
    
    
    
}