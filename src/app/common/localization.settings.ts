import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalizationSettings {
    public currencyOptions = {
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
        onInvalidPaste: 'truncate'
    };
}
