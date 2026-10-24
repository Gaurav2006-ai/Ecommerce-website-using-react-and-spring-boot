import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from './Axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/product/${id}`);
        setProduct({
          ...response.data,
          Description: response.data.Description ?? response.data.description ?? '',
          price: response.data.price ?? '',
          quantity: response.data.quantity ?? '',
          relaeaseDate: response.data.relaeaseDate
            ? String(response.data.relaeaseDate).slice(0, 10)
            : '',
        });
        if (response.data.imgDate) {
          setImagePreview(
            `data:${response.data.imgType || 'image/jpeg'};base64,${response.data.imgDate}`
          );
        }
      } catch (fetchError) {
        console.error(fetchError);
        setError('Unable to load this product for editing.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProduct((currentProduct) => ({
      ...currentProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files?.[0] || null;
    setImage(selectedImage);
    if (!selectedImage) {
      setImagePreview(
        product.imgDate
          ? `data:${product.imgType || 'image/jpeg'};base64,${product.imgDate}`
          : ''
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result));
    reader.onerror = () => {
      console.error('Unable to preview selected product image');
      setError('Unable to preview the selected image.');
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      description: product.Description,
      price: product.price === '' ? null : Number(product.price),
      category: product.category,
      quantity: product.quantity === '' ? 0 : Number(product.quantity),
      relaeaseDate: product.relaeaseDate
        ? `${product.relaeaseDate}T00:00:00.000Z`
        : null,
      available: product.available,
    };

    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );
    if (image) {
      formData.append('imgFile', image);
    }

    try {
      await API.put(`/product/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/product/${id}`);
    } catch (saveError) {
      console.error(saveError);
      setError('Unable to save product changes. Please try again.');
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="product-message">Loading product...</p>;
  }

  if (!product) {
    return (
      <main className="product-edit-page">
        <p className="product-edit-error" role="alert">
          {error || 'Product not found.'}
        </p>
        <Link className="product-back-link" to="/">Back to products</Link>
      </main>
    );
  }

  return (
    <main className="product-edit-page">
      <Link className="product-back-link" to={`/product/${id}`}>
        &larr; Back to product
      </Link>
      <h1>Update product</h1>
      <form className="product-edit-form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="name">Name</label>
        <input
          className="form-control"
          id="name"
          name="name"
          value={product.name || ''}
          onChange={handleChange}
          required
        />

        <label className="form-label" htmlFor="brand">Brand</label>
        <input
          className="form-control"
          id="brand"
          name="brand"
          value={product.brand || ''}
          onChange={handleChange}
        />

        <label className="form-label" htmlFor="Description">Description</label>
        <textarea
          className="form-control"
          id="Description"
          name="Description"
          value={product.Description || ''}
          onChange={handleChange}
          rows="4"
        />

        <label className="form-label" htmlFor="price">Price</label>
        <input
          className="form-control"
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={product.price}
          onChange={handleChange}
          required
        />

        <label className="form-label" htmlFor="category">Category</label>
        <input
          className="form-control"
          id="category"
          name="category"
          value={product.category || ''}
          onChange={handleChange}
        />

        <label className="form-label" htmlFor="quantity">Stock quantity</label>
        <input
          className="form-control"
          id="quantity"
          name="quantity"
          type="number"
          min="0"
          step="1"
          value={product.quantity}
          onChange={handleChange}
          required
        />

        <label className="form-label" htmlFor="relaeaseDate">Release date</label>
        <input
          className="form-control"
          id="relaeaseDate"
          name="relaeaseDate"
          type="date"
          value={product.relaeaseDate}
          onChange={handleChange}
        />

        <label className="form-label" htmlFor="image">Product image</label>
        {imagePreview && (
          <img className="product-edit-image-preview" src={imagePreview} alt="Product preview" />
        )}
        <input
          className="form-control"
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <small className="product-edit-hint">
          Choose a new image to replace the current one. Leave empty to keep it.
        </small>

        <div className="form-check">
          <input
            className="form-check-input"
            id="available"
            name="available"
            type="checkbox"
            checked={Boolean(product.available)}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="available">
            Product available
          </label>
        </div>

        {error && <p className="product-edit-error" role="alert">{error}</p>}
        <div className="product-edit-actions">
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save changes'}
          </button>
          <Link className="btn btn-outline-secondary" to={`/product/${id}`}>
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
};

export default EditProduct;
