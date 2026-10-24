import { Link } from 'react-router-dom';

const Cart = ({ cart, onRemove }) => {
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <h1>Shopping cart</h1>
      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link className="btn btn-primary" to="/">Browse products</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <div>
                  <Link className="cart-item-name" to={`/product/${item.id}`}>
                    {item.name || 'Unnamed product'}
                  </Link>
                  <p>{item.brand || 'Brand not provided'} · Quantity: {item.quantity}</p>
                </div>
                <div className="cart-item-actions">
                  <strong>${(Number(item.price || 0) * item.quantity).toFixed(2)}</strong>
                  <button className="btn btn-outline-secondary" type="button" onClick={() => onRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
          <p className="cart-total">Total: ${total.toFixed(2)}</p>
        </>
      )}
    </main>
  );
};

export default Cart;