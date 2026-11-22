import{useState,useEffect} from"react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://localhost:3000/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("I aint fetching allat bro", error);
                setLoading(false);
            });
        }, []);

        
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (loading) return <p>Patience,im loading...</p>

        return (
            <div className="product-list-page">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                {filteredProducts.length === 0 ? (
                    <p className="no-products">we dont have that,get sth else</p>
                ) : (
                    <div className="product-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        );
    }