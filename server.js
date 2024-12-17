import express from 'express';

// const express = require("express")

const wishlist = [
  {
    id: 1,
    title: 'Marble Track',
    owner: 'Isaiah',
  },
  {
    id: 2,
    title: 'Horse',
    owner: 'Miriam',
  },
];

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (request, response) => {
  console.log('Hello, World');
  response.send('Hello from our Web Server!');
});

app.get('/wishlist', (req, res) => {
  res.json(wishlist);
});

app.get('/wishlist/:id', (req, res) => {
  const { id } = req.params;
  const item = wishlist.find((stuff) => stuff.id === +id);
  if (!item) res.status(404).send('Item not found');
  res.json(item);
});

app.post('/wishlist', (req, res) => {
  // console.log(req.body);
  wishlist.push({ ...req.body, id: wishlist.length + 1 });
  res.send('New entry added');
});

app.listen(port, () => {
  console.log('Server is listening');
});
