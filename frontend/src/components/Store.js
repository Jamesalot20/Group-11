import React, { useState, useEffect } from 'react';
import api from '../api';
import styles from '../Store.css';
const Store = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const getProducts = async () => {
    try {
      const response = await api.get('/api/products', {
        params: { search, category },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [category]);

  return (
    <div>
      <h1>Store</h1>
      <input
        type="text"
        placeholder="Search for products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={getProducts}>Search</button>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
        <option value="category3">Category 3</option>
        {/* Add more categories here */}
      </select>

      <div>
        {products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
