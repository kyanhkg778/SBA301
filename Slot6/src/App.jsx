import { useState } from "react";
import { Container } from "react-bootstrap";
import AppNavbar from "./components/AppNavbar";
import ProductStats from "./components/ProductStats";
import ProductSearch from "./components/ProductSearch";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import AppFooter from "./components/AppFooter";
import { ThemeProvider } from "./context/ThemeContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useProductFilter } from "./hooks/useProductFilter";
import { initialProducts } from "./data/initialProducts";

function ProductManagerContent() {
  const [products, setProducts] = useLocalStorage("sba301_products", initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);

  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
    filteredProducts
  } = useProductFilter(products);

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === productData.id ? productData : p))
      );
      setEditingProduct(null);
    } else {
      setProducts((prev) => [productData, ...prev]);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      if (editingProduct && editingProduct.id === id) {
        setEditingProduct(null);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar productCount={products.length} />
      <Container className="flex-grow-1">
        <ProductStats products={products} />
        <ProductForm
          onSave={handleSaveProduct}
          editingProduct={editingProduct}
          onCancelEdit={handleCancelEdit}
        />
        <ProductSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
        />
        <ProductList
          products={filteredProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </Container>
      <AppFooter />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ProductManagerContent />
    </ThemeProvider>
  );
}

export default App;
