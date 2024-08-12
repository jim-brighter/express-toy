CREATE SCHEMA express_toy;

CREATE TABLE express_toy.todo (
  id serial primary key,
  text varchar(5000),
  create_time timestamptz default current_timestamp
);
