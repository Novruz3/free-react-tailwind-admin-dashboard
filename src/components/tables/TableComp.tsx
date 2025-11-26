import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

type TableCompProps<T> = {
  tableData: T[];
  tableHead: string[];
  renderHead: (data: string, index: number) => React.ReactNode;
  renderData: (data: T, index: number) => React.ReactNode;
  search: string;
  onSearch: (value: string) => void;
  page: number;
  totalPages: number | undefined;
  totalCount?: number | undefined;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  isFetching: boolean;
  limit?: number;
  onLimitChange: (value: number) => void;
};

function TableCompInner<T extends { id: string }>(props: TableCompProps<T>) {
  const {
    tableData,
    tableHead,
    renderHead,
    renderData,
    search,
    onSearch,
    page,
    totalPages,
    totalCount,
    onPageChange,
    isLoading,
    isFetching,
    limit,
    onLimitChange,
  } = props;

  return (
    <div className="overflow-hidden rounded-2xl border bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <span>
          Total Count: {isLoading || isFetching ? "Loading..." : totalCount}
        </span>
        <Input
          className="lg:min-w-64"
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHead.map((head, index) => renderHead(head, index))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isFetching ? (
              <TableRow>
                <TableCell className="text-center py-6">Loading...</TableCell>
              </TableRow>
            ) : (
              tableData.map((row, index) => renderData(row, index))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center gap-3 mt-4">
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="border rounded px-1 py-1"
        >
          {[5, 10, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <Button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-2 border rounded disabled:opacity-40"
          variant="outline"
        >
          Prev
        </Button>

        <span className="px-4 py-2 bg-gray-800 text-white rounded">{page}</span>

        <Button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-2 border rounded disabled:opacity-40"
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const TableComp = React.memo(TableCompInner) as typeof TableCompInner;
export default TableComp;
