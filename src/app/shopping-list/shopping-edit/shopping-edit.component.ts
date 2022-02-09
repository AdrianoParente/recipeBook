import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  public subscription: Subscription;
  editMode = false;
  edditedItemIndex: number;
  eddittedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditting.subscribe(
      (index: number) => {
        this.editMode = true;
        this.edditedItemIndex = index;
        this.eddittedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.eddittedItem.name,
          amount: this.eddittedItem.amount
        })
      }
    )
  }

  onAdd(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode){
      this.shoppingListService.updateIngredient(this.edditedItemIndex, newIngredient);
    }else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.edditedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
