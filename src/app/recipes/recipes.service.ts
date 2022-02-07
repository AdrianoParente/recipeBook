import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Wiener Würstel','super leckeres Fingerfood','https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',[
            new Ingredient('Würstel', 2),
            new Ingredient('Pommes', 500)
        ]),
        new Recipe('Grillteller','Das Essen für echte Männer','https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', [
            new Ingredient('Fleisch', 200),
            new Ingredient('Pommes', 500)
        ])
      ];
      constructor(private shoppingListService: ShoppingListService ){}
      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(id:number){
          return this.recipes[id];
      }

      addToRecipeService(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
      }
}