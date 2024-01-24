import React, { useMemo, useState } from "react";
import formatDate from "../functions/formatDate";
import { useTable, usePagination } from "react-table";
import { Link } from "react-router-dom";

//ChatGPT got this working. Please don't break it. <3

function ReportData(ips) {
  const [filterInput, setFilterInput] = useState("");

  const data = React.useMemo(
    () =>
      Object.keys(ips.ips).map((key) => ({
        ...ips.ips[key],
        threatLevel: getThreatLevel(ips.ips[key].risk_score),
        date: formatDate(ips.ips[key].dateofscan),
        expiration: formatDate(ips.ips[key].expirationdate),
      })),
    [ips]
  );
  const filteredData = React.useMemo(() => {
    if (!filterInput) return data;
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
        accessor: "date", // accessor is the "key" in the data
      },
      {
        Header: "IP Address Scanned",
        accessor: "ip",
      },
      {
        Header: "No. of Detections",
        accessor: (d) => d.blacklists.detections,
        id: "detections", // id is required when accessor is a function
      },
      {
        Header: "Risk Score",
        accessor: "risk_score",
        Cell: ({ value }) => (
          <div className={getThreatLevel(value)}>{value}</div>
        ),
      },
      {
        Header: "Expiration",
        accessor: "expiration",
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row }) => (
          <Link to={`/single-ip/${row.original.ip}`}>View IP</Link>
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
  } = useTable({ columns, data: filteredData }, usePagination);

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
                <th {...column.getHeaderProps()} className="table-header">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              // <Link key={row.original.ip} to={`/single-ip/${row.original.ip}/`}>
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
              // </Link>
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
      {Object.keys(ips).length === 0 && <div>No entries found.</div>}
    </>
  );
}

function getThreatLevel(riskScore) {
  if (riskScore > 66) {
    return "crit-threat";
  } else if (riskScore > 33) {
    return "high-threat";
  } else if (riskScore > 1) {
    return "mid-threat";
  } else {
    return "low-threat";
  }
}

export default ReportData;
