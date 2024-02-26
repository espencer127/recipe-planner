import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeList } from './RecipeList';
import { Observable } from 'rxjs';
import { ShoppingList } from './ShoppingList';
import { ScrapeRequest } from './ScrapeRequest';
import { FullResponse } from './FullResponse';
import { FormControl } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class HttpService {

    private grocyUrl = 'http://localhost:8888';

    constructor(private httpClient: HttpClient) { }

    getRecipes(): Observable<RecipeList> {
        return this.httpClient.get<RecipeList>(this.grocyUrl+"/get");
    }
    
    getShoppingList(bodyodyody: RecipeList): Observable<ShoppingList> {
        return this.httpClient.post<ShoppingList>(this.grocyUrl+"/shoppingList/get", bodyodyody)
    }

    scrapeRecipe(url: string | null | undefined) : Observable<FullResponse> {
        let scrapeRequest = new ScrapeRequest(url, true);
        return this.httpClient.post<FullResponse>(this.grocyUrl+"/scrape", scrapeRequest);
    }

    insertRecipe(postBody: FullResponse) : Observable<String> {
        return this.httpClient.post<String>(this.grocyUrl+"/insert", postBody);
    }
}