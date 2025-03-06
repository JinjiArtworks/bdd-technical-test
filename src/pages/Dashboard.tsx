import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
}

export default function Dashboard() {
    const { products, fetchProducts } = useProductStore();
    const [view, setView] = useState("table");

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const columns: ColumnDef<Product>[] = [
        { accessorKey: "id", header: "ID", enableSorting: true },
        { accessorKey: "title", header: "Title", enableSorting: true },
        { accessorKey: "price", header: "Price", enableSorting: true },
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => (
                <img
                    src={row.original.image}
                    alt={row.original.title}
                    className="h-10 w-10 object-contain"

                />
            ),
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <Link
                    to={`/product/${row.original.id}`}
                    className="text-blue-500 hover:underline"
                >
                    Detail
                </Link>
            ),
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Products</h1>

            {/* Tabs - Adjusted for auto width */}
            <Tabs value={view} onValueChange={setView} className="mb-6">
                <TabsList className="gap-2 mx-auto max-w-fit ">
                    <TabsTrigger value="table">Table View</TabsTrigger>
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Table View */}
            {view === "table" && <DataTable columns={columns} data={products} />}

            {/* Grid View */}
            {view === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Card key={product.id} className="shadow-md flex flex-col h-full">
                            <CardHeader className="p-0">
                                <div className="w-full h-40 flex items-center justify-center bg-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="max-h-36 object-contain"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 flex-grow">
                                <h2 className="text-lg font-bold line-clamp-2">{product.title}</h2>
                                <p className="text-gray-600 font-semibold">${product.price}</p>
                            </CardContent>
                            <CardFooter className="p-4 flex justify-between border-t">
                                <Link to={`/product/${product.id}`}>
                                    <Button variant="outline">View</Button>
                                </Link>
                                <Button>Add to Cart</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}