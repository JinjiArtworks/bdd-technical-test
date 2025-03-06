import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
}

export default function Dashboard() {
    const { products, fetchProducts } = useProductStore();

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
                    className="h-10 w-10 object-cover"
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
                    View
                </Link>
            ),
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <DataTable columns={columns} data={products} />
        </div>
    );
}