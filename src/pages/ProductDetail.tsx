import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react"; // Using Lucide icons for stars
export default function ProductDetail() {
    const { id } = useParams();
    const { product, fetchProductById } = useProductStore();

    useEffect(() => {
        if (id) fetchProductById(Number(id));
    }, [id, fetchProductById]);

    if (!product) return <p className="text-center py-10 text-lg">Loading...</p>;

    return (
        <div className="container mx-auto p-6">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left - Product Image */}
                <div className="flex justify-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full max-w-md object-cover rounded-lg "
                    />
                </div>

                {/* Right - Product Info */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{product.title} </h1>
                    <p className="text-lg font-semibold text-gray-800">${product.price}</p>

                    <div className="flex items-center gap-2">
                        <div className="flex text-yellow-500">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star key={i}
                                    size={20}
                                    fill={i < Math.round(product.rating.rate) ? "currentColor" : "none"}
                                    stroke="currentColor"
                                />
                            ))}
                        </div>
                        <p className="text-gray-600 text-sm">
                            {product.rating.rate} / 5 ({product.rating.count} reviews)
                        </p>
                    </div>
                    <p className="text-gray-600">{product.description}</p>

                    <div className="flex gap-4 mt-4">
                        <Button className="w-full md:w-auto">Add to Cart</Button>
                        <Button variant="outline" className="w-full md:w-auto">Buy Now</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}