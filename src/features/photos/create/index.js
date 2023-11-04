import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPhoto } from '../photos.slice';

import './create.css';

export default function CreatePhoto() {
  const [formData, setFormData] = useState({ imageUrl: undefined, caption: undefined });
  const dispatch = useDispatch();

  function handleChange({ target: { name, value } }) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormData(dispatch(addPhoto(formData)));
  }

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h2>Add a dog</h2>
      <div>
        <label htmlFor="url">Enter your image's url: </label>
        <input
          id="url"
          name="imageUrl"
          onChange={handleChange}
          placeholder="e.g., https://images.dog.ceo/breeds/australian-shepherd/pepper.jpg"
          type="url"
          value={formData.imageUrl}
          required
        />
      </div>
      <div>
        <label htmlFor="caption">Enter your image's caption: </label>
        <input
          id="caption"
          name="caption"
          onChange={handleChange}
          placeholder="e.g., Australian Shepherd"
          type="text"
          value={formData.caption}
          required
        />
      </div>
      <input type="submit" />
    </form>
  );
}
