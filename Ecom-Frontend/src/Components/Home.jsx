import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import API from './Axios';


    const Home=({ onAddToCart, searchQuery = '' })=>{
        const { category } = useParams();
        const [product,setProduct]= useState([]);
        const [error,setError]=useState(false);
        const [loading,setLoading]=useState(true);

        useEffect(()=>{
            const controller = new AbortController();
            const fetchData = async () =>{
                const query = searchQuery.trim();
                setLoading(true);
                try{
                    const response = query
                        ? await API.get('/product/search', {
                            params: { keyword: query },
                            signal: controller.signal,
                          })
                        : await API.get('/product', { signal: controller.signal });
                    setProduct(response.data);
                    setError(false);
                }catch(error){
                    if (!controller.signal.aborted) {
                        console.error(error);
                        setError(true);
                    }
                }finally{
                    if (!controller.signal.aborted) {
                        setLoading(false);
                    }
                }
            };
            fetchData();
            return () => controller.abort();
        },[searchQuery]);
         if (loading) {
            return <h2 className="text-center" style={{ padding: "5rem" }}>Loading products...</h2>;
        }
        if (error) {
            return <h2 className="text-center" style={{ padding: "5rem" }}>Unable to load products</h2>;
        }
        const normalizedQuery = searchQuery.trim().toLowerCase();
        const displayedProducts = product.filter((item) => {
            return !category
                || (item.category || '').toLowerCase() === category.toLowerCase();
        });
        return (
            <>
            {normalizedQuery && (
                <div className="category-heading">
                    <h1>Search results</h1>
                    <p>Products matching “{searchQuery.trim()}”</p>
                </div>
            )}
            {category && (
                <div className="category-heading">
                    <h1>{category} products</h1>
                    <Link className="product-back-link" to="/">View all products</Link>
                </div>
            )}
            {displayedProducts.length === 0 ? (
                <h2 className="text-center" style={{ padding: "5rem" }}>
                    {normalizedQuery
                        ? `No products found matching "${searchQuery.trim()}".`
                        : category
                          ? `No products found in ${category}.`
                          : 'No products available.'}
                </h2>
            ) : (
            <div className="grid">
            {displayedProducts.map((p) => (
                <div className="card" key={p.id}>
                <div className="card-body">
                    {p.imgDate && (
                        <Link className="product-card-image-link" to={`/product/${p.id}`}>
                            <img
                                className="product-card-image"
                                src={`data:${p.imgType || 'image/jpeg'};base64,${p.imgDate}`}
                                alt={p.imgName || p.name || 'Product'}
                                loading="lazy"
                            />
                        </Link>
                    )}
                    <div className="product-card-content">
                    <Link className="product-card-link" to={`/product/${p.id}`}>
                        <h5 className="card-title">{(p.name || '').toUpperCase()}</h5>
                        <i className="card-brand">~ {p.brand}</i>
                    </Link>
                    <div className="card-footer-row">
                    <h5 className="card-price">${p.price}</h5>
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => onAddToCart(p)}
                    >
                        Add to cart
                    </button>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
            )}
            </>
        );
    };
  


export default Home
