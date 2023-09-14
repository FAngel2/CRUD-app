const express = require("express");
const knex = require("knex")(require("../knexfile.js")["development"]);
const cors = require("cors");
const port = 8081;
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cors());

// message its up and running
app.get("/", (req, res) => {
  res.send("Application is up and running.");
});

//Endpoints

// User Registration
app.post("/signup", async (req, res) => {
  const user = req.body;
  if (user.first_name && user.last_name && user.password && user.username) {
    try {
      // Hash the user's password before storing it
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Store the hashed password in the database
      const newUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        password: hashedPassword,
      };

      await knex.insert(newUser).into("users");

      res.status(201).json({
        message: `User ${user.username} created successfully`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error creating user",
      });
    }
  } else {
    res.status(400).json({
      message: "Missing required fields",
    });
  }
});
// User Login
app.post("/login", async (req, res) => {
  const user = req.body;
  try {
    // Retrieve user from the database
    const userDb = await knex
      .select("*")
      .from("users")
      .where("username", user.username)
      .first();

    if (userDb) {
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(
        user.password,
        userDb.password
      );

      if (passwordMatch) {
        // Passwords match, user is authenticated
        res.status(200).json(userDb);
      } else {
        // Passwords do not match
        res.status(401).json({
          message: "Authentication failed",
        });
      }
    } else {
      // User not found in the database
      res.status(401).json({
        message: "Authentication failed",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error authenticating user",
    });
  }
});

// Inventory Management

// Get users items
app.get("/inventory", (req, res) => {
  const userId = req.user.id; // Assuming you have user authentication middleware
  knex
    .select("*")
    .from("items")
    .where("user_id", userId)
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error fetching user's inventory",
      });
    });
});

// Create a new item
app.post("/inventory", (req, res) => {
  const item = req.body;
  knex
    .insert(item)
    .into("items")
    .then(() =>
      res.status(201).json({
        message: `Item ${item.item_name} created successfully`,
      })
    )
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error creating item",
      });
    });
});

// Delete an item
app.delete("/inventory/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  knex("items")
    .where("id", itemId)
    .del()
    .then(() =>
      res.status(200).json({
        message: `Item with ID ${itemId} deleted successfully`,
      })
    )
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error deleting item",
      });
    });
});

// Edit an item
app.put("/inventory/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  const updatedItem = req.body;
  knex("items")
    .where("id", itemId)
    .update(updatedItem)
    .then(() =>
      res.status(200).json({
        message: `Item with ID ${itemId} updated successfully`,
      })
    )
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error updating item",
      });
    });
});

// Public Item Viewing

// Get all items for unauthenticated users
app.get("/public/inventory", (req, res) => {
  knex
    .select(
      "id",
      "item_name",
      knex.raw("LEFT(description, 100) as description"),
      "quantity"
    )
    .from("items")
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error fetching public inventory",
      });
    });
});

// Get a specific item for unauthenticated users
app.get("/public/inventory/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  knex
    .select("*")
    .from("items")
    .where("id", itemId)
    .then((data) => {
      if (data.length === 0) {
        res.status(404).json({
          message: "Item not found",
        });
      } else {
        res.status(200).json(data[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error fetching public item",
      });
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
