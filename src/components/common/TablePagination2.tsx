"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

const TablePagination2: React.FC<{
  count: number;
  page: number;
  perPage: number;
  setPage: any;
}> = ({ count, page, perPage, setPage }) => {
  const maxPage =
    count % perPage === 0
      ? Math.floor(count / perPage)
      : Math.floor(count / perPage) + 1;
  const getPaginationArray = (
    totalPages: number,
    currentPage: number,
    delta = 1,
  ) => {
    const pagination = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(i);
      }
    } else if (currentPage === 1) {
      pagination.push(1, 2, 3, "...", totalPages);
    } else if (currentPage === 2) {
      pagination.push(1, 2, 3, "...", totalPages);
    } else if (currentPage === totalPages) {
      pagination.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else if (currentPage === totalPages - 1) {
      pagination.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else if (currentPage === totalPages - 2) {
      pagination.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else if (currentPage === totalPages - 3) {
      pagination.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pagination.push(
        1,
        "...",
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      );
    }
    return pagination;
  };

  const handlePageClick = (value: number | string) => {
    if (value === "...") {
      return;
    }
    setPage(value);
  };

  const previous = () => {
    if (page - 1 <= 1) {
      setPage(1);
      return;
    }
    setPage(page - 1);
  };

  const next = () => {
    if (page + 1 >= maxPage) {
      setPage(maxPage);
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
              onClick={() => handlePageClick(p)}
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
