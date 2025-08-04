

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

function EditBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const res = await axios.get(`http://campusshala.com:8688/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setForm({
          title: res.data.title || '',
          content: res.data.content || '',
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 403) {
          setError('Session expired. Please log in again.');
        } else {
          setError('Failed to fetch blog data');
        }
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        return;
      }

      await axios.put(`http://campusshala.com:8688/api/blogs/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Blog updated successfully!');
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        setError('Session expired. Please log in again.');
      } else {
        setError(err.response?.data?.error || 'Update failed!');
      }
    }
  };

  if (loading) return <p>Loading blog data...</p>;

  return (<>
    <Navbar/>
    <div style={{ minHeight: '100vh', background: '#f5f6fa', padding: '40px 0' }}>
      <div style={{
        maxWidth: '500px',
        margin: 'auto',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        padding: '32px 28px',
        border: '1px solid #e0e0e0',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>Edit Blog</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontWeight: 500, color: '#555' }}>Title:</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontWeight: 500, color: '#555' }}>Content:</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={10}
              required
              style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', resize: 'vertical' }}
            />
          </div>
          <button type="submit" style={{
            marginTop: '10px',
            padding: '12px 0',
            width: '100%',
            background: 'linear-gradient(90deg, #007bff 0%, #0056b3 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '18px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            letterSpacing: '1px',
            transition: 'background 0.2s',
          }}>
            Update Blog
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default EditBlogPage;

