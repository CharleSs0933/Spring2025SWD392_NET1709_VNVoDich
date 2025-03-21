import { PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";

interface TableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  onDelete?: (id: number) => void;
  onUpdate?: (id: number) => void;
  onCreate?: () => void;
  onUpdateStatus?: (id : number) => void;
  ITEMS_PER_PAGE: number;
}

const CustomTable = <T extends { id: number }>({
  data,
  columns,
  ITEMS_PER_PAGE,
  onDelete,
  onUpdate,
  onCreate,
  onUpdateStatus,
}: TableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((row) =>
    columns.some((col) =>
      String(row[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = String(a[sortColumn]).toLowerCase();
    const bValue = String(b[sortColumn]).toLowerCase();
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (colKey: keyof T) => {
    if (sortColumn === colKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(colKey);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-5 justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="mb-4 p-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {onCreate && (
          <button onClick={onCreate} className="mb-4 text-green-600 p-3">
            <PlusCircleIcon size={35} />
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-black text-center">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-2 text-left border cursor-pointer"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}{" "}
                  {sortColumn === col.key
                    ? sortOrder === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
              ))}
              <th className="px-4 py-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border">
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="px-4 py-2 border text-black"
                    >
                      {String(row[col.key])}
                    </td>
                  ))}
                  <td className="px-4 py-2 border text-center">
                    {onUpdate && (
                      <button
                        onClick={() => onUpdate(row.id)}
                        className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
                      >
                        Update
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row.id)}
                        className="mr-2 px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    )}
                    {onUpdateStatus && (
                      <button
                        onClick={() => onUpdateStatus(row.id)}
                        className="mr-2 px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Banned
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-2 text-center"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomTable;
