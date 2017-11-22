import {NgModule,Component,Input,Output,EventEmitter,forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObjectUtils} from './objectutils';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

interface SelectItem {
    label: string;
    value: any;
    styleClass?: string;
}

export const SELECTBUTTON_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Checkbox),
  multi: true
};

@Component({
    selector: 'app-checkbox',
    template: `
        <div class="row" [ngClass]="'ui-selectbutton ui-buttonset ui-corner-all ui-buttonset-' + options.length">
            <div *ngFor="let option of options; let i = index" class="ui-widget col-lg-3 col-md-4 col-sm-4 col-xs-6"
                [ngClass]="{'ui-state-active':isSelected(option), 'ui-state-disabled':disabled}" (click)="onItemClick($event,option,cbox,i)">
                <div class="check-image" [ngStyle]="{'background-image':'url(' + option.url + ')'}" ></div>
                <div class="ui-helper-hidden-accessible">
                    <input #cbox type="checkbox" [checked]="isSelected(option)" (focus)="onFocus($event)" (blur)="onBlur($event)" [attr.tabindex]="tabindex" [attr.disabled]="disabled">
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./checkbox.scss'],
    providers: [ObjectUtils,SELECTBUTTON_VALUE_ACCESSOR]
})
export class Checkbox implements ControlValueAccessor {

    @Input() tabindex: number;

    @Input() multiple: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() disabled: boolean;

    @Input() optionLabel: string;

    @Output() onOptionClick: EventEmitter<any> = new EventEmitter();

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    value: any;

    focusedItem: HTMLInputElement;

    _options: any[];

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    constructor(public objectUtils: ObjectUtils) {}

    @Input() get options(): any[] {
        return this._options;
    }

    set options(val: any[]) {
        let opts = this.optionLabel ? this.objectUtils.generateSelectItems(val, this.optionLabel) : val;
        this._options = opts;
    }

    writeValue(value: any) : void {
        this.value = value;
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
    }

    onItemClick(event, option: SelectItem, checkbox: HTMLInputElement, index: number) {
        if(this.disabled) {
            return;
        }

        checkbox.focus();

        if(this.multiple) {
            let itemIndex = this.findItemIndex(option);
            if(itemIndex != -1)
                this.value = this.value.filter((val,i) => i!=itemIndex);
            else
                this.value = [...this.value||[], option.value];
        }
        else {
            this.value = option.value;
        }

        this.onOptionClick.emit({
            originalEvent: event,
            option: option,
            index: index
        });

        this.onModelChange(this.value);

        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }

    onFocus(event: Event) {
        this.focusedItem = <HTMLInputElement>event.target;
    }

    onBlur(event) {
        this.focusedItem = null;
        this.onModelTouched();
    }

    isSelected(option: SelectItem) {
        if(this.multiple)
            return this.findItemIndex(option) != -1;
        else
            return option.value == this.value;
    }

    findItemIndex(option: SelectItem) {
        let index = -1;
        if(this.value) {
            for(let i = 0; i < this.value.length; i++) {
                if(this.value[i] == option.value) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Checkbox],
    declarations: [Checkbox]
})
export class SelectButtonModule { }
