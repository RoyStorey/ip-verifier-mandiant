import React, { useMemo, useState } from "react";
import formatDate from "../functions/formatDate";
import { useTable, usePagination, useSortBy } from "react-table";
import { Link } from "react-router-dom";

function ListOfArtifacts(artifacts) {
  const [filterInput, setFilterInput] = useState("");
  console.log(artifacts);

  const data = React.useMemo(
    () =>
      Object.keys(artifacts.artifacts).map((key) => ({
        ...artifacts.artifacts[key],
        date: formatDate(artifacts.artifacts[key].date_scanned),
      })),
    [artifacts]
  );
  const filteredData = React.useMemo(() => {
    if (!filterInput) {
      return data;
    }
    return data.filter((row) => {
      // Assuming you want to search across all fields
      return Object.values(row).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(filterInput.toLowerCase())
      );
    });
  }, [data, filterInput]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Artifact",
        accessor: "artifact",
      },
      {
        Header: "Artifact Type",
        accessor: "type",
      },
      {
        Header: () => (
          <span title="Mandiant's risk score. 0 is known to be very benign, and 100 is known to be very malicious. ~50 means that there is not enough data to make any determination.">
            Mandiant Score
          </span>
        ),
        accessor: "mscore",
        Cell: ({ value }) => {
          const getColor = (score) => {
            const hue = ((100 - score) * 120) / 100; // 0 is red, 120 is green
            return `hsl(${hue}, 100%, 50%)`; // Fully saturated, moderate lightness
          };
          return <span style={{ color: getColor(value) }}>{value}</span>;
        },
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row }) => (
          <Link to={`/single-artifact/${row.original.artifact}`}>
            View Artifact
          </Link>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we use page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data: filteredData }, useSortBy, usePagination);

  // Render the UI for your table
  return (
    <>
      <input
        className="search-bar"
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
        placeholder={"Search"}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="table-header"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination-controls">
        <div className="buttons">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      {Object.keys(artifacts).length === 0 && <div>No entries found.</div>}
    </>
  );
}

export default ListOfArtifacts;
