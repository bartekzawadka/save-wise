import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import React from "react";

function CurrencyField(props) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            allowNegative={false}
            decimalScale={2}
            fixedDecimalScale={true}
            thousandSeparator=" "
            decimalSeparator=","
        />
    );
}

CurrencyField.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CurrencyField;
