CREATE SCHEMA toy;

CREATE TABLE toy.todo (
  id serial primary key,
  text varchar(5000),
  create_time timestamptz default current_timestamp
);
