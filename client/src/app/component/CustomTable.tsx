import { Filter, PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";

interface TableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
  onCreate: () => void;
}

const CustomTable = <T extends { id: number }>({ data, columns, onDelete, onUpdate, onCreate }: TableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredData = data.filter((row) =>
    columns.some((col) => String(row[col.key]).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = String(a[sortColumn]).toLowerCase();
    const bValue = String(b[sortColumn]).toLowerCase();
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

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
      <button onClick={onCreate} className="mb-4 text-green-600  p-3"> <PlusCircleIcon size={35}/> </button>
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
                  {col.label} {sortColumn === col.key ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
              ))}
              <th className="px-4 py-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-2 border text-black">
                      {String(row[col.key])}
                    </td>
                  ))}
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => onUpdate(row.id)}
                      className="mr-2 px-2 py-1 bg-blue-500 text-white-50 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => onDelete(row.id)}
                      className="px-2 p-2 py-1 bg-red-500 text-white-50 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-2 text-center">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
