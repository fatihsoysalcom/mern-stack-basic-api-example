const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory 'database' for simplicity
let items = [
  { id: 1, name: 'Sample Item 1' },
  { id: 2, name: 'Sample Item 2' }
];
let nextId = 3;

// GET all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET a single item by ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// POST a new item
app.post('/items', (req, res) => {
  const newItem = {
    id: nextId++,
    name: req.body.name
  };
  if (!newItem.name) {
    return res.status(400).send('Item name is required');
  }
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT (update) an item by ID
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  if (itemIndex !== -1) {
    if (req.body.name) {
      items[itemIndex].name = req.body.name;
      res.json(items[itemIndex]);
    } else {
      res.status(400).send('Item name is required for update');
    }
  } else {
    res.status(400).send('Item not found');
  }
});

// DELETE an item by ID
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = items.length;
  items = items.filter(item => item.id !== id);
  if (items.length < initialLength) {
    res.status(204).send(); // No Content
  } else {
    res.status(404).send('Item not found');
  }
});

app.listen(port, () => {
  console.log(`MERN API example running on http://localhost:${port}`);
});
