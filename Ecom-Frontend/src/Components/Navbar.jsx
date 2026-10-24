import { Link } from "react-router-dom";


const Navbar = ({ cartCount, theme, onToggleTheme, searchQuery, onSearchChange }) => {
  const handleSearchChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Sidhu</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary add-product-button" to="/addProduct">Add Product</Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/category/Laptop">Laptop</Link></li>
                <li><Link className="dropdown-item" to="/category/Headphone">Headphone</Link></li>
                <li><Link className="dropdown-item" to="/category/Mobile">Mobile</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <div className="product-search">
            <label htmlFor="product-search-input">Search products</label>
            <input
              id="product-search-input"
              className="form-control"
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Name, brand, or category"
            />
          </div>
        </div>
        <button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          aria-pressed={theme === 'dark'}
        >
          <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
          <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
        <Link className="cart-link" to="/cart" aria-label={`Shopping cart, ${cartCount} items`}>
          <span className="cart-icon" aria-hidden="true">&#128722;</span>
          <span className="cart-label">Cart</span>
          <span className="cart-count">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;