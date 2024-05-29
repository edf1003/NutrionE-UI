import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TreeNodeDTO } from 'src/models/models-classes';

@Component({
  selector: 'app-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeSelectComponent),
      multi: true,
    },
  ],
})
export class TreeSelectComponent implements OnInit {
  @Input() formControlName: string;
  @Input() label: string;
  @Input() tree: TreeNodeDTO<unknown>[];
  @Input() nodeLabelField = 'name';
  @Input() readOnly = false;
  currentTree: TreeNodeDTO<unknown>[];
  selectedValues: TreeNodeDTO<unknown>[] = [];
  sending = false;
  control: FormControl;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName) as FormControl;
    }
    if (!this.control.value) {
      this.currentTree = this.tree;
    } else {
      this.tree.forEach(node => this.searchNode(node, []));
    }
  }

  searchNode(node: TreeNodeDTO<unknown>, path: TreeNodeDTO<unknown>[]) {
    if (node.id === this.control.value) {
      this.selectedValues = path;
      this.selectedValues.push(node);
      this.currentTree = node.children;
      return;
    }
    if (node.children) {
      node.children.forEach(child => this.searchNode(child, [...path, node]));
    }
  }

  selectNode(node: TreeNodeDTO<unknown>) {
    this.selectedValues.push(node);
    this.control.setValue(node.id);
    this.currentTree = node.children;
  }

  unselectNode(node: TreeNodeDTO<unknown>) {
    const index = this.selectedValues.findIndex(e => e.id === node.id);
    this.selectedValues.splice(index, this.selectedValues.length - index);
    if (this.selectedValues.length) {
      this.control.setValue(this.selectedValues[this.selectedValues.length - 1].id);
      this.control.markAsDirty();
      this.currentTree = this.selectedValues[this.selectedValues.length - 1].children;
    } else {
      this.control.setValue(null);
      this.control.markAsDirty();
      this.currentTree = this.tree;
    }
    return;
  }

  trackBy(index: number, name: TreeNodeDTO<unknown>) {
    return name.id;
  }

  registerOnChange() {
    return;
  }

  registerOnTouched() {
    return;
  }
  writeValue() {
    return;
  }
  setDisabledState() {
    return;
  }
}
