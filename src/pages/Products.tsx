import React, { useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import TableComp from "../components/tables/TableComp";
import { IProduct } from "../types/IProduct";
import { useModal } from "../hooks/useModal";
import ProductModal from "../components/modals/ProductModal";

const initialData: IProduct[] = [
  {
    id: 1,
    name: "MacBook Pro 13”",
    variants: "2 Variants",
    category: "Laptop",
    price: "$2399.00",
    status: "Delivered",
    image: "/images/product/product-01.jpg",
  },
  {
    id: 2,
    name: "Apple Watch Ultra",
    variants: "1 Variant",
    category: "Watch",
    price: "$879.00",
    status: "Pending",
    image: "/images/product/product-02.jpg",
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max",
    variants: "2 Variants",
    category: "SmartPhone",
    price: "$1869.00",
    status: "Delivered",
    image: "/images/product/product-03.jpg",
  },
  {
    id: 4,
    name: "iPad Pro 3rd Gen",
    variants: "2 Variants",
    category: "Electronics",
    price: "$1699.00",
    status: "Canceled",
    image: "/images/product/product-04.jpg",
  },
  {
    id: 5,
    name: "AirPods Pro 2nd Gen",
    variants: "1 Variant",
    category: "Accessories",
    price: "$240.00",
    status: "Delivered",
    image: "/images/product/product-05.jpg",
  },
];

const tableHead: string[] = ["Product", "Price", "Category", "Status", "Actions"];
const filterData: string[] = ["Shop1", "Shop2"];

const Products: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [products, setProducts] = useState<IProduct[]>(initialData);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  function handleAddProduct() {
    setSelectedProduct(null);
    openModal();
  }

  function handleEditProduct(product: IProduct) {
    setSelectedProduct(product);
    openModal();
  }

  function handleSave(productFromModal: IProduct) {
    // if id exists and > 0 -> update, otherwise create new
    if (productFromModal.id && productFromModal.id > 0) {
      setProducts((prev) =>
        prev.map((p) => (p.id === productFromModal.id ? { ...productFromModal } : p))
      );
    } else {
      // generate new id (simple)
      const nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      setProducts((prev) => [{ ...productFromModal, id: nextId }, ...prev]);
    }
    closeModal();
  }

  function handleDelete(productId: number) {
    if (!confirm("Delete this product?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }

  return (
    <>
      <PageMeta title="Products" description="Products" />
      <PageBreadcrumb pageTitle="Products" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex flex-col gap-6">
          <TableComp
            tableData={products}
            tableHead={tableHead}
            filterData={filterData}
            onAdd={handleAddProduct}
            onEdit={handleEditProduct}
            onDelete={handleDelete}
          />

          <ProductModal
            isOpen={isOpen}
            closeModal={closeModal}
            product={selectedProduct}
            onSave={handleSave}
          />
        </div>
      </div>
    </>
  );
};

export default Products;
