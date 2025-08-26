import { useState } from "react";

/**
 * Custom Hook that toggles sort order
 * @param {string} column - column name
 * @param {string} sortOrder - column sort order (default = "asc")
 */
export default function useSort(column, sortOrder = "asc") {
  const [sorting, setSorting] = useState({
    column_name: column,
    order: sortOrder,
  });

  const toggleSortOrder = () => {
    setSorting((prev) => ({
      ...prev,
      order: prev.order === "asc" ? "desc" : "asc",
    }));
  };

  return {
    sorting,
    toggleSortOrder,
  };
}
