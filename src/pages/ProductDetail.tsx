// pages/ProductDetail.tsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";

export default function ProductDetail() {
    const { id } = useParams();
    const { product, fetchProductById } = useProductStore();

    useEffect(() => {
        if (id) fetchProductById(Number(id));
    }, [id, fetchProductById]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <img src={product.image} alt={product.title} className="w-48 h-48 object-cover my-4" />
            <p className="text-lg font-semibold">${product.price}</p>
            <p className="text-gray-600">{product.description}</p>
        </div>
    );
}