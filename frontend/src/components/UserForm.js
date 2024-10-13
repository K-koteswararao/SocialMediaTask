import React, { useState } from 'react';

const UserForm = () => {
  const [name, setName] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialMedia', socialMedia);
    images.forEach((image) => formData.append('images', image));

    // Send to backend
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      alert('Data submitted successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Social Media Handle:</label>
        <input
          type="text"
          value={socialMedia}
          onChange={(e) => setSocialMedia(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Upload Images:</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
