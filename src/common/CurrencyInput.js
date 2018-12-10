import React, {Component} from 'react';
import CurrencyFormat from "react-currency-format";
import PropTypes from 'prop-types';

class CurrencyInput extends Component {
    render() {
        return <CurrencyFormat value={this.props.value}
                               displayType='input'
                               onChange={this.props.onChange}
                               thousandSeparator=' '
                               decimalScale={2}
                               fixedDecimalScale={true}
                               suffix=" zł"
                               decimalSeparator=','/>
    }
}

CurrencyInput.propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func
};

export default CurrencyInput;
