import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeList } from './RecipeList';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HttpService {

    private grocyUrl = 'http://localhost:8888/get';

    constructor(private httpClient: HttpClient) { }

    getRecipes(): Observable<RecipeList> {
        return this.httpClient.get<RecipeList>(this.grocyUrl);
    }
    
}