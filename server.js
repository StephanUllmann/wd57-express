import express from 'express';
import Wishlist from './models/Wishlist.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (request, response) => {
  console.log('Hello, World');
  response.send('Hello from our Web Server!');
});

// CRUD Operation

// Create Wishlist
app.post('/wishlist', async (req, res) => {
  const { title, owner } = req.body;
  if (!title || !owner) return res.status(400).json({ msg: 'All fields are required' });

  try {
    const item = await Wishlist.create({ title, owner });
    if (!item) return res.status(500).json({ msg: 'Creating failed' });
    res.json({ data: item, msg: 'Creation successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Wishlist item cannot be created.' });
  }
});

// Read Wishlist

// Read all

app.get('/wishlist', async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll();

    if (!wishlist.length) return res.status(404).json({ msg: 'No entry yet.' });

    res.json({ data: wishlist, msg: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Read one
app.get('/wishlist/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const wishlist = await Wishlist.findByPk(id);

    if (!wishlist) return res.status(404).json({ msg: 'No entry found.' });

    res.json({ data: wishlist, msg: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update Wishlist
app.put('/wishlist/:id', async (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;
  if (!title || !owner) return res.status(400).json({ msg: 'All fields are required' });

  try {
    const dbRes = await Wishlist.update({ title, owner }, { where: { id } });
    console.log(dbRes);
    if (!dbRes[0]) return res.status(500).json({ msg: 'Update failed' });
    res.json({ msg: 'Update successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Wishlist item cannot be updated.' });
  }
});

// Delete Wishlist
app.delete('/wishlist/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dbRes = await Wishlist.destroy({ where: { id } });

    if (!dbRes) return res.status(404).json({ msg: 'No entry found to delete.' });

    res.json({ msg: 'Successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.listen(port, () => {
  console.log('Server is listening');
});
