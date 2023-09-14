exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users").del()
    .then(function () {
      return knex("users").insert([
    {
      first_name: "Fernando",
      last_name: "Angel",
      username: "fangel1",
      password: "password1",
    },
    {
      first_name: "Fernando2",
      last_name: "Angel2",
      username: "fangel2",
      password: "password2",
    },
    {
      first_name: "Fernando3",
      last_name: "Angel3",
      username: "fangel3",
      password: "password3",
    },
    {
      first_name: "Fernando4",
      last_name: "Angel4",
      username: "fangel4",
      password: "password4",
    },
    {
      first_name: "Fernando5",
      last_name: "Angel5",
      username: "fangel5",
      password: "password5",
    },
  ]);
});
};
