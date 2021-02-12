import React, { useState, useEffect } from 'react';
import { normalizePrice } from '../../utils'

const Product = ({ product, api, changeTotal }) => {
  const { price, name, pid, min, max, isBlocked } = product;

  const [qty, setQty] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [normalizedPrice, setNormalizedPrice] = useState(normalizePrice(price));

  const changeQty = changeCount => {
    if (qty < min) {
      setQty(min);
      changeTotal(min * normalizedPrice);
    } else {
      setQty(qty + changeCount);
      changeTotal(changeCount * normalizedPrice);
    }
  }

  const resetQty = () => {
    const amoutToDetract = -qty * normalizedPrice;
    setQty(0);
    changeTotal(amoutToDetract);
  }

  const checkQty = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pid, quantity: qty })
    };

    try {
      setIsLoading(true);
      const response = await fetch(`${api}/api/product/check`, requestOptions);
    } catch (error) {
      resetQty();
    }
    setIsLoading(false);
  }

  return (
    <div className="container" >
      <h3>{name}</h3>
      <ul>
        <li className="row">{`${name} ${normalizedPrice.toFixed(2)} PLN`}</li>
        <li className="row">
          <p>{`Obecnie masz ${qty} sztuk produktu`}</p>
          <button disabled={qty == max || isBlocked} onClick={() => changeQty(1)}>+</button>
          <button disabled={qty == min || isBlocked} onClick={() => changeQty(-1)}>-</button>
          <button disabled={isLoading} onClick={checkQty}>Sprawdź</button>
        </li>
      </ul>
    </div>
  )
}

export default Product;
