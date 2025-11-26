import React, { useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import TableComp from "../components/tables/TableComp";
import { TableCell, TableRow } from "../components/ui/table";
import Button from "../components/ui/button/Button";
import RejectModal from "../components/modals/RejectModal";
import { useQuery } from "@tanstack/react-query";
import { getShops } from "../api/queries/Getters";
import { getBaseUrl } from "../utils/helpers";

const tableHead: string[] = [
  "Shop",
  "Name",
  "Address",
  "Coordinate",
  "Products at home",
  "Delivery service",
  "Phone Numbers",
  "Shop Owner",
  "Shop Center",
  "Offial Shop",
  "Actions",
];

const Shops: React.FC = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["getShops", { page, limit, search }],
    queryFn: () => getShops({ page, limit, search }),
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });

  const shopsData = data;

  // bular poka reject ucin son uytgetmeli
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectName, setRejectName] = useState("");
  function openRejectModal(id: string, name: string) {
    setRejectId(id);
    setRejectName(name);
  }
  function confirmReject() {
    // setShops((prev) =>
    //   // prev?.shops.filter((shop) => shop.id !== rejectId)
    // );
  }
  //reject gutaryar

  return (
    <>
      <RejectModal
        isOpen={!!rejectId}
        shopName={rejectName}
        closeModal={() => setRejectId(null)}
        onConfirm={confirmReject}
      />
      <PageMeta title="Shops" description="Shops" />
      <PageBreadcrumb pageTitle="Shops" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex flex-col gap-6">
          <TableComp
            search={search}
            onSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
            isLoading={isLoading}
            isFetching={isFetching}
            page={page}
            limit={limit}
            onLimitChange={(value) => {
              setLimit(value);
              setPage(1);
            }}
            totalPages={shopsData?.page_count}
            totalCount={shopsData?.count}
            onPageChange={setPage}
            tableHead={tableHead}
            tableData={shopsData?.shops || []}
            renderHead={(head, index) => (
              <TableCell
                key={index}
                isHeader
                className="py-3 font-medium text-gray-500 text-center text-theme-xs"
              >
                {head}
              </TableCell>
            )}
            renderData={(shop, index) => (
              <TableRow key={index}>
                <TableCell className="p-2">
                  <img
                    src={getBaseUrl(shop.image)}
                    className="min-w-12 h-12 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>{shop.name_tm}</TableCell>
                <TableCell>{shop.address_tm}</TableCell>
                <TableCell>
                  {shop.latitude}, {shop.longitude}
                </TableCell>
                <TableCell>{shop.at_home ? "Yes" : "No"}</TableCell>
                <TableCell>{shop.has_shipping ? "Yes" : "No"}</TableCell>
                <TableCell>{shop.phones.join(", ")}</TableCell>
                <TableCell>{shop.shop_owner.full_name}</TableCell>
                <TableCell>{shop.name_tm}</TableCell>
                <TableCell>{shop.is_brand ? "Yes" : "No"}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" className="bg-green-500">
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-500"
                    onClick={() => openRejectModal(shop.id, shop.name_tm)}
                  >
                    Reject
                  </Button>
                  <Button size="sm" className="bg-yellow-500">
                    Trash
                  </Button>
                </TableCell>
              </TableRow>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Shops;
