-- Creation of user table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name varchar(250) NOT NULL,
  email varchar(250) NOT NULL,
  password varchar(250) NOT NULL,
  data varchar(10485759) NULL,
  description varchar(10485759) NULL,
  banner varchar(10485759) NULL,
  picture varchar(10485759) NULL,
  notification varchar(10485759) NULL
);

-- Creation of services table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  action varchar(250) NOT NULL,
  actionParams varchar(10485759) NULL,
  reaction varchar(250) NOT NULL,
  reactionParams varchar(10485759) NULL,
  trigger varchar(250) NOT NULL,
  triggerParams varchar(10485759) NULL,
  owner varchar(250) NOT NULL
);