

const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

//  Create a new blog

router.post('/', auth, (req, res) => {
  const { title, content } = req.body;
  const { id: userId, name: userName, email: userEmail ,created_at:usercreatedat} = req.user;

  const sql = 'INSERT INTO blogs (user_id, title, content) VALUES (?, ?, ?)';
  db.query(sql, [userId, title, content], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to create blog' });
    res.status(201).json({ message: 'Blog created successfully', id: result.insertId , user: {
        id: userId,
        name: userName,
        email: userEmail,
        created_at:usercreatedat
      }});
  });
});

//Get all blogs with user info
router.get('/', (req, res) => {
  const sql = `
    SELECT blogs.id, blogs.title, blogs.content, blogs.created_at, users.name
    FROM blogs
    JOIN users ON blogs.user_id = users.id
    ORDER BY blogs.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch blogs' });
    res.json(results);
  });
});


//  Public route
router.get('/:id', (req, res) => {
  const blogId = req.params.id;

  const sql = `
    SELECT blogs.id, blogs.title, blogs.content, blogs.created_at, 
           users.id AS userId, users.name AS name, users.email AS email
    FROM blogs
    JOIN users ON blogs.user_id = users.id
    WHERE blogs.id = ?
  `;

  db.query(sql, [blogId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    if (results.length === 0) return res.status(404).json({ error: 'Blog not found' });

    res.json(results[0]);
  });
});


//Update blog
router.put('/:id', auth, (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.id;
  const { title, content } = req.body;

  const sql = 'UPDATE blogs SET title = ?, content = ? WHERE id = ? AND user_id = ?';
  db.query(sql, [title, content, blogId, userId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to update blog' });
    if (result.affectedRows === 0) return res.status(403).json({ error: 'Not authorized or blog not found' });
    res.json({ message: 'Blog updated successfully' });
  });
});




// DELETE a blog by ID
router.delete('/:id', auth, (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.id; 

  const sql = 'DELETE FROM blogs WHERE id = ? AND user_id = ?';
  db.query(sql, [blogId, userId], (err, result) => {
    if (err) {
      console.error('Delete blog error:', err);
      return res.status(500).json({ error: 'Server error', details: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(403).json({ error: 'Not authorized to delete this blog or blog not found', blogId, userId });
    }

    res.json({ message: 'Blog deleted successfully', blogId });
  });
});

module.exports = router;
