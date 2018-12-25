import React, {Component} from 'react';
import CurrencyFormat from "react-currency-format";
import PropTypes from 'prop-types';

class PercentageText extends Component {
    render() {
        return <CurrencyFormat value={this.props.value}
                               displayType='text'
                               thousandSeparator=' '
                               decimalScale={2}
                               fixedDecimalScale={true}
                               suffix=" %"
                               decimalSeparator=','
                               className={this.props.className}/>
    }
}

PercentageText.propTypes = {
    className: PropTypes.string,
    value: PropTypes.object.isRequired
};

export default PercentageText;
