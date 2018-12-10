import React, {Component} from 'react';
import CurrencyFormat from "react-currency-format";
import PropTypes from 'prop-types';

class CurrencyText extends Component {
    render() {
        return <CurrencyFormat value={this.props.value}
                               displayType='text'
                               thousandSeparator=' '
                               decimalScale={2}
                               fixedDecimalScale={true}
                               suffix=" zł"
                               decimalSeparator=','
                               className={this.props.className}/>
    }
}

CurrencyText.propTypes = {
    className: PropTypes.string,
    value: PropTypes.object.isRequired
};

export default CurrencyText;
