import React, { useState, useEffect } from 'react';
import api from '../api';

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const fetchSellerProducts = async () => {
    try {
      const response = await api.get('/api/users/my-products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching seller products:', error);
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/users/createProduct', newProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (response.status === 201) {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', description: '', price: '', category: '' });
      } else {
        console.error('Failed to create product:', response.status);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div>
      <h1>My Products</h1>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="GPU">GPU</option>
          <option value="CPU">CPU</option>
          <option value="RAM">RAM</option>
          {/* Add more categories if needed */}
        </select>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default SellerProducts;
