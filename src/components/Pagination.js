import React from "react";

const Pagination = ({ page, setPage, data }) => {
  return (
    <div>
      {page !== 1 && (
        <span className="pointer" onClick={() => setPage(page - 1)}>
          &lt;&nbsp;
        </span>
      )}
      {/* Donne la page actuelle */}
      <span>{page}</span>
      {data.next !== null && (
        <span className="pointer" onClick={() => setPage(page + 1)}>
          &nbsp;&gt;
        </span>
      )}
    </div>
  );
};

export default Pagination;
