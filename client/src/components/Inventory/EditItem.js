import React, { useState, useEffect } from "react";

const EditItem = ({ match }) => {
  const itemId = match.params.id;

  const [item, setItem] = useState({
    item_name: "",
    description: "",
    quantity: 0,
  });

  useEffect(() => {}, [itemId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="item_name">Item Name:</label>
          <input
            type="text"
            id="item_name"
            name="item_name"
            value={item.item_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={item.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={item.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Update Item</button>
        </div>
      </form>
    </div>
  );
};

export default EditItem;
