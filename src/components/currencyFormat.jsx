import React from 'react'

function currencyFormat({price}) {
    const formatCurrency = (num) =>
        new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(num);
      
  return (
    <p className='inline'>{formatCurrency(price)}</p>
  )
}

export default currencyFormat