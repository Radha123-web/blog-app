import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ title, desc, author, date, id }) => {
  const navigate = useNavigate();
  const handleReadMore = () => {
    navigate(`/blogs/${id}`);
  };
  return (
    <div className="blog-card">
      <img src="blog.png" alt="Blog" />
      <h3>{title}</h3>
      <p className="desc">{desc}</p>
      <div className="blog-footer">
       <div style={{display:"flex",justifyContent:"space-between",flexDirection:"column",alignItems:"center"}}>
        <div style={{marginBottom:"5px"}}>AuthorName: {author}</div>
        <div>CreatedAt:  {date}</div>
      </div>
        <div style={{display:"flex", justifyContent:"center",marginTop:"10px"}}>
        <button className="read-more" style={{ display:"flex",background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', padding: 0,justifyContent:"center" }} onClick={handleReadMore}>
          Read More →
        </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;




