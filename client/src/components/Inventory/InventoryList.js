import React, { useEffect, useState } from 'react';

const InventoryList = () => {

  const [inventory, setInventory] = useState([]);

 
  useEffect(() => {
    fetch('http://localhost:8081/inventory')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {

        setInventory(data);
      })
      .catch((error) => {
        console.error('Error fetching inventory:', error);
      });
  }, []);

  return (
    <div>
      <h1>Inventory List</h1>
      <ul>
        {inventory.map((item) => (
          <li key={item.id}>
            {item.item_name}: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;