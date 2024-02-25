import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeList } from './RecipeList';
import { Observable } from 'rxjs';
import { ShoppingList } from './ShoppingList';

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
}