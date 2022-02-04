import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.scss']
})
export class RecipesDetailComponent implements OnInit {
@Input() recipe:Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  addToShoppingList(){
this.recipeService.addToRecipeService(this.recipe.ingredients);
  }

}