import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dropdown-with-selection',
  templateUrl: './dropdown-with-selection.component.html',
  styleUrls: ['./dropdown-with-selection.component.css']
})
export class DropdownWithSelectionComponent {

  @Input() selections: string[] = ['Test', 'Test2'];
  @Input() text = 'Test ...';

  ChangeSortOrder(newSortOrder: string) {
    this.text = newSortOrder;
  }

}
