
import React, { useEffect, useState } from 'react';
import picture from '../assest/picture.png'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://campusshala.com:8688/api/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = () => {
    const token = localStorage.getItem('token');
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    axios.delete(`http://campusshala.com:8688/api/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert("Blog deleted successfully!");
        navigate('/'); // redirect to home
      })
      .catch(err => {
        console.error(err);
        alert("Failed to delete blog.");
      });
  };

  if (!blog) return <p>Loading...</p>;

  return (<>
    <Navbar/>
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>{blog.title}</h1>

      {/* Author Info */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
          alt="profile" 
          style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }} 
        />
        <div>
          <h4 style={{ margin: '0' }}>{blog?.name}</h4>
          <p style={{ margin: '0', color: 'gray' }}>{blog?.email }</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          <Link to={`/edit/${blog.id}`}>
            <button style={{ padding: '8px 12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
              Edit Blog
            </button>
          </Link>

          <button 
            onClick={handleDelete}
            style={{ padding: '8px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Delete Blog
          </button>
        </div>
      </div>

      {/* Blog Date */}
      <p style={{ color: 'gray', marginTop: '-10px' }}>
        📅 {new Date(blog.created_at).toLocaleString()}
      </p>

      {/* Blog Image */}
      <div style={{ margin: '20px 0' }}>
        <img 
          src={blog.imageUrl || picture} 
          alt="blog visual" 
          style={{ width: '100%', borderRadius: '10px' }} 
        />
      </div>

      {/* Blog Content */}
      <div style={{ fontSize: '16px', lineHeight: '1.6', textAlign: 'justify' }}>
        {blog.content}
      </div>
    </div>
    </>
  );
}

export default BlogDetail;
