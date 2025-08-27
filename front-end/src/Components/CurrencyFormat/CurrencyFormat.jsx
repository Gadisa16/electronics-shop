import React from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';

const CurrencyFormat =({amount})=>{
    const formattedAmount= numeral(amount).format("$0,0.00")
    return <div>{ formattedAmount }</div>
}

CurrencyFormat.propTypes = {
    amount: PropTypes.number.isRequired,
};

export default CurrencyFormat