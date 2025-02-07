"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

const TablePagination2: React.FC<{
  count: number;
  page: number;
  perPage: number;
  setPage: any;
}> = ({ count, page, perPage, setPage }) => {
  const maxPage = count % perPage === 0 ? Math.floor(count / perPage) : Math.floor(count / perPage) + 1;
  const getPaginationArray = (
    totalPages: number,
    currentPage: number,
    delta = 1,
  ) => {
    const range = [];
    const left = currentPage - delta;
    const right = currentPage + delta;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= left && i <= right) ||
        (currentPage <= 2 && i <= 4) || // Ensure first few numbers are shown when on pages 1 or 2
        (currentPage >= totalPages - 1 && i >= totalPages - 3) // Ensure last few numbers are shown when near the end
      ) {
        range.push(i);
      }
    }

    // Add dots (`...`) where gaps exist
    const pagination = [];
    let lastPage = 0;
    for (let page of range) {
      if (lastPage && page - lastPage > 1) {
        pagination.push("...");
      }
      pagination.push(page);
      lastPage = page;
    }

    return pagination;
  };

  const previous = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const next = () => {
    const tp = count / perPage;
    if (page >= tp) {
      return;
    }
    setPage(page + 1);
  };

  return (
    <div className="flex items-center justify-center mt-[32px]">
      <div className="flex items-center">
        <button className="inline-flex p-2" onClick={() => previous()}>
          <span>
            <ChevronLeftIcon
              className={`${page === 1 ? "text-[#919EAB]" : "text-[#EBECF2]"}`}
              width={20}
              height={20}
            />
          </span>
        </button>
        <div className="flex gap-2 ml-[10px]">
          {getPaginationArray(maxPage, page).map((p) => (
            <button
              className={`${page === p ? "bg-[#919EAB14]" : "bg-transparent"} w-[32px] h-[32px]`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
        <button className="inline-flex p-2 ml-[10px]" onClick={() => next()}>
          <span>
            <ChevronRightIcon
              className={`${page === maxPage ? "text-[#919EAB]" : "text-[#EBECF2]"}`}
              width={20}
              height={20}
            />
          </span>
        </button>
      </div>
    </div>
  );
};

export default TablePagination2;
