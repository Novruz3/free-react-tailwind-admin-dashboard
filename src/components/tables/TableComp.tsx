import React, { useMemo, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { PencilIcon, TrashBinIcon } from "../../assets/icons";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { IProduct } from "../../types/IProduct";

export type TableComponentProps = {
  tableData: IProduct[];
  tableHead: string[];
  filterData?: string[];
  onAdd: () => void;
  onEdit: (product: IProduct) => void;
  onDelete?: (productId: number) => void;
};

function BeforeTableComponent(props: TableComponentProps) {
  const { tableData, tableHead, filterData, onAdd, onEdit, onDelete } = props;

  // Filter dropdown
  const [isOpen, setIsOpen] = useState(false);
  const filterBtnRef = useRef<HTMLButtonElement | null>(null);

  function toggleDropdown(e?: React.MouseEvent) {
    // prevent the global click-outside handler from firing
    e?.stopPropagation();
    setIsOpen((s) => !s);
  }
  function closeDropdown() {
    setIsOpen(false);
  }

  // Search state (client-side)
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tableData;
    return tableData.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.price.toLowerCase().includes(q)
    );
  }, [tableData, query]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // ensure current page within bounds when data/pageSize changes
  if (currentPage > totalPages) setCurrentPage(totalPages);

  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filtered.slice(startIndex, startIndex + pageSize);

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-4">
        <span>Products count: {totalItems}</span>

        <Input
          className="lg:min-w-64"
          placeholder="Search product..."
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="flex gap-2 relative">
          {filterData && (
            <>
              <button
                ref={filterBtnRef}
                onClick={toggleDropdown}
                className="dropdown-toggle"
                // make sure click doesn't bubble to document
              >
                <Button variant="outline">Filter</Button>
              </button>

              <Dropdown
                isOpen={isOpen}
                onClose={closeDropdown}
                // if your Dropdown supports triggerRef you can pass it:
                // triggerRef={filterBtnRef}
                className="absolute right-32 mt-[48px] flex w-[120px] flex-col rounded-2xl border border-gray-200 bg-white p-1 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark z-50"
              >
                <ul className="flex flex-col gap-1 py-1">
                  <li>
                    {filterData.map((val, index) => (
                      <DropdownItem
                        onItemClick={closeDropdown}
                        key={index}
                        tag="a"
                        className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                      >
                        {val}
                      </DropdownItem>
                    ))}
                  </li>
                </ul>
              </Dropdown>
            </>
          )}

          <Button onClick={onAdd}>Add Product</Button>
        </div>
      </div>

      {/* TABLE */}
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              {tableHead.map((val, index) => (
                <TableCell
                  key={index}
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  {val}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {currentData.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={product.image}
                        className="h-[50px] w-[50px] object-cover"
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.name}
                      </p>
                      <p className="text-theme-xs text-gray-500">{product.variants}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm">
                  {product.price}
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm">
                  {product.category}
                </TableCell>

                <TableCell className="py-3 text-theme-sm">
                  <Badge
                    size="sm"
                    color={
                      product.status === "Delivered"
                        ? "success"
                        : product.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>

                <TableCell className="py-6 text-xl flex gap-4 items-center">
                  <button
                    onClick={() => onEdit(product)}
                    aria-label="Edit"
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <PencilIcon />
                  </button>

                  <button
                    onClick={() => onDelete && onDelete(product.id)}
                    aria-label="Delete"
                    className="p-1 rounded hover:bg-red-50"
                  >
                    <TrashBinIcon className="text-red-500" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
        {/* Total Count */}
        <p className="text-gray-500 text-sm dark:text-gray-400">
          Showing {Math.min(startIndex + 1, totalItems)}–{Math.min(startIndex + pageSize, totalItems)} of {totalItems}
        </p>

        {/* Page Size */}
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm dark:text-gray-400">
            Rows per page:
          </span>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-3 py-1 bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm disabled:opacity-40"
          >
            Prev
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-2 rounded-xl text-sm ${
                  currentPage === page
                    ? "bg-gray-800 text-white dark:bg-gray-700"
                    : "border border-gray-300 dark:border-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

const TableComp = React.memo(BeforeTableComponent) as typeof BeforeTableComponent;
export default TableComp;
