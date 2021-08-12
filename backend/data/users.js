import bcrypt from 'bcrypt';

const users = [
  {
    name: 'Admin User',
    email: 'admin@mail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'jdoe@mail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Luis Montes',
    email: 'luis@mail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
