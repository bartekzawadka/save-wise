import React, {Component} from 'react';
import CurrencyFormat from "react-currency-format";
import PropTypes from 'prop-types';

class CurrencyText extends Component {
    render() {
        return <CurrencyFormat value={this.props.value}
                               displayType='text'
                               thousandSeparator=' '
                               suffix=" zł"
                               decimalSeparator=','/>
    }
}

CurrencyText.propTypes = {
    value: PropTypes.object.isRequired
};

export default CurrencyText;
