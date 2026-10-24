import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from './Axios';

const Product = ({ onAddToCart, onDeleteProduct }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/product/${id}`);
        setProduct(response.data);
      } catch (fetchError) {
        console.error(fetchError);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${product.name || 'this product'}"? This cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    setDeleteError('');
    try {
      await API.delete(`/product/${id}`);
      onDeleteProduct(id);
      navigate('/');
    } catch (deleteRequestError) {
      console.error(deleteRequestError);
      setDeleteError('Unable to delete this product. Please try again.');
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="product-message">Loading product details...</p>;
  }

  if (error) {
    return <p className="product-message">Unable to load product details.</p>;
  }

  if (!product) {
    return <p className="product-message">Product not found.</p>;
  }
  
  return (
    <main className="product-detail">
      <Link className="product-back-link" to="/">&larr; Back to products</Link>
      <section className="product-detail-content">
        <div className="product-detail-heading">
          {product.imgDate && (
            <img
              className="product-detail-image"
              src={`data:${product.imgType || 'image/jpeg'};base64,${product.imgDate}`}
              alt={product.imgName || product.name || 'Product'}
            />
          )}
          <p className="product-detail-category">{product.category || 'Product'}</p>
          <h1>{product.name || 'Unnamed product'}</h1>
          <p className="product-detail-brand">{product.brand || 'Brand not provided'}</p>
          <p className="product-detail-price">
            {product.price != null ? `$${product.price}` : 'Price unavailable'}
          </p>
          <button
            className="btn btn-primary product-add-button"
            type="button"
            onClick={() => onAddToCart(product)}
          >
            Add to cart
          </button>
          <div className="product-management-actions">
            <Link className="btn btn-outline-primary" to={`/product/${id}/edit`}>
              Update product
            </Link>
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete product'}
            </button>
          </div>
          {deleteError && <p className="product-action-error" role="alert">{deleteError}</p>}
        </div>
        <div className="product-detail-information">
          <h2>Product details</h2>
          <p className="product-detail-description">
            {product.Description || product.description || 'No description available.'}
          </p>
          <dl>
            <div>
              <dt>Availability</dt>
              <dd>{product.available ? 'In stock' : 'Unavailable'}</dd>
            </div>
            <div>
              <dt>Stock quantity</dt>
              <dd>{product.quantity ?? 'Not specified'}</dd>
            </div>
            <div>
              <dt>Release date</dt>
              <dd>{product.relaeaseDate || 'Not specified'}</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
};

export default Product;