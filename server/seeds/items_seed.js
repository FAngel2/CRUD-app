exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("items").del()
    .then(function () {
      // Inserts seed entries
      return knex("items").insert([
    {
      user_id: 1,
      item_name: "Scary Book",
      description: "A very scary book.",
      quantity: 1,
    },
    {
      user_id: 2,
      item_name: "Funny Book",
      description: "A very funny book.",
      quantity: 1,
    },
    {
      user_id: 3,
      item_name: "Sad Book",
      description: "A very sad book.",
      quantity: 1,
    },
    {
      user_id: 4,
      item_name: "Boring Book",
      description: "A very boring book.",
      quantity: 1,
    },
    {
      user_id: 5,
      item_name: "Educational Book",
      description: "A very educational book.",
      quantity: 1,
    },
  ]);
});
};
