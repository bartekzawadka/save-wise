import {
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {IonInput} from "@ionic/angular";
import {Cost} from "../../../models/budget/Cost";
import {ValueAccessorBase} from "../value-accessor-base";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CostPositionInputMode} from "./cost-position-input-mode";

@Component({
    selector: 'cost-position-input',
    templateUrl: './cost-position-input.component.html',
    styleUrls: ['./cost-position-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CostPositionInputComponent),
            multi: true
        }
    ]
})
export class CostPositionInputComponent extends ValueAccessorBase<Cost> implements OnInit {

    private options = {
        digitGroupSeparator: ' ',
        decimalCharacter: ',',
        decimalCharacterAlternative: ',',
        currencySymbol: ' zł',
        currencySymbolPlacement: 's',
        roundingMethod: 'U',
        maximumValue: "999999999999.99",
        unformatOnSubmit: true,
        caretPositionOnFocus: 'start',
        emptyInputBehavior: 'zero',
        modifyValueOnWheel: false,
        outputFormat: ',',
        onInvalidPaste: 'truncate',
        watchExternalChanges: true,
        readOnly: false
    };

    @ViewChild(IonInput) input: IonInput;
    @ViewChild('currencyInput') currencyInput : ElementRef;

    @Input()
    public namePlaceHolder: string;

    @Input()
    public canEditName = true;

    @Input()
    public canEditValue = true;

    @Input()
    public mode: CostPositionInputMode = CostPositionInputMode.insert;

    @Output()
    buttonClick = new EventEmitter<Cost>();

    constructor() {
        super(new Cost());
    }

    ngOnInit() {
        if(this.canEditValue === false || this.isSummaryMode()) {
            this.options.readOnly = true;
        }
    }

    onClick() {
        this.buttonClick.emit(this.value);
        if(this.mode === CostPositionInputMode.insert){
            this.value = new Cost();
        }
    }

    isRemoveButtonVisible(){
        return this.mode === CostPositionInputMode.edit;
    }

    isAddButtonVisible(){
        return this.mode === CostPositionInputMode.insert;
    }

    isSummaryMode() {
        return this.mode === CostPositionInputMode.summary;
    }

    getCurrencyInputSize(){
        let value = this.currencyInput.nativeElement.value;
        let size = 10;
        if(!value){
            return size;
        }
        let length = value.toString().length;
        if(length < size){
            return size;
        }

        return length;
    }
}
