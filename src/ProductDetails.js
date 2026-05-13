import { useParams } from "react-router-dom";
import { allProducts } from "../data/products"; 

export default function ProductDetails() {
  const { id } = useParams();

  const product = allProducts.find(p => p.id === Number(id));

  if (!product) return <h2>Product not found</h2>;

  return (
    <div style={{ padding:"20px" }}>
      <h1>{product.name}</h1>
      <img src={product.img} alt={product.name} width="200" />
      <p>{product.description}</p>
      <h3>${product.price}</h3>
    </div>
  );
}