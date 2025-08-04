
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function BlogCreate() {
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [publishing, setPublishing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { title, content } = form;

    if (!title.trim() || !content.trim()) {
      setError('Please fill in both title and content');
      return;
    }

    if (title.length > 200) {
      setError('Title must be less than 200 characters');
      return;
    }

    if (content.length > 10000) {
      setError('Content must be less than 10,000 characters');
      return;
    }

    try {
      setPublishing(true);
      const token = localStorage.getItem('token');
      const response = await axios.post('http://campusshala.com:8688/api/blogs', form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const Id = response.data.id;
      navigate(`/blogs/${Id}`);

    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create blog');
    } finally {
      setPublishing(false);
    }
  };

  return (<>
    <Navbar />
    <div style={{ maxWidth: '700px', margin: 'auto', paddingTop: '40px', padding: '20px' }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        padding: '20px 16px',
        border: '1px solid #e0e0e0',
        margin: '0 auto',
        maxWidth: '800px'
      }}>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Create Blog</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              maxLength={200}
              placeholder="Enter blog title"
              required
              style={{
                width: '95%',
                minWidth: '220px',
                maxWidth: '100%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <div style={{ fontSize: '12px', textAlign: 'right', color: '#555' }}>
              {form.title.length}/200 characters
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Content *</label>
            <textarea
              name="content"
              rows={10}
              value={form.content}
              onChange={handleChange}
              maxLength={10000}
              placeholder="Write your blog content here..."
              required
              style={{
                width: '95%',
                minWidth: '220px',
                maxWidth: '100%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                resize: 'vertical',
                minHeight: '200px',
              }}
            />
            <div style={{ fontSize: '12px', textAlign: 'right', color: '#555' }}>
              {form.content.length}/10,000 characters
            </div>
          </div>

          <div style={{
            backgroundColor: '#f0f7ff',
            border: '1px solid #cce5ff',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3 style={{ marginBottom: '10px', fontWeight: '600', color: '#0056b3' }}>
              Publishing Guidelines
            </h3>
            <ul style={{ fontSize: '14px', color: '#0056b3', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>• Write original content that adds value to the community</li>
              <li>• Use clear and engaging titles that describe your content</li>
              <li>• Structure your content with proper paragraphs for readability</li>
              <li>• Be respectful and constructive in your writing</li>
            </ul>
          </div>

          {error && (
            <p style={{ color: 'red', marginBottom: '15px', fontWeight: 'bold' }}>{error}</p>
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #e0e0e0',
            paddingTop: '20px'
          }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                background: 'none',
                border: 'none',
                color: '#333',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={publishing || !form.title.trim() || !form.content.trim()}
              style={{
                backgroundColor: publishing ? '#a5b4fc' : '#4f46e5',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: publishing ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {publishing ? (
                <>
                  <span className="loader" style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #fff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Publishing...
                </>
              ) : (
                <>
                  <span style={{ fontSize: '18px' }}>✈</span> Publish Blog
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
  );
}

export default BlogCreate;


