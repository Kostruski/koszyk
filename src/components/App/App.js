import React, { useState, useEffect } from 'react';
import Product from './Product'
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const api = 'http://localhost:3030'

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(`${api}/api/cart`);
        const result = await response.json();

        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const changeTotal = value => {
    setTotal(total + value);
  }

  if (!data.length) return null;

  return (
    <>
      {data.map(product => {
        product.min = parseInt(product.min);
        product.max = parseInt(product.max);

        return (<Product key={product.pid} product={product} api={api} changeTotal={changeTotal} />)
      }
      )}
      <h1>{`Całkowita suma zamówienia ${total.toFixed(2)} PLN`}</h1>
    </>
  )
};

export {
  App
};
