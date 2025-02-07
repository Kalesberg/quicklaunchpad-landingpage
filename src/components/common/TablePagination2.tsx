"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";

const TablePagination2: React.FC<{
  count: number;
  page: number;
  perPage: number;
  setPage: any;
}> = ({ count, page, perPage, setPage }) => {
  console.log('count', count);
  const maxPage = Math.floor(count/perPage) + 1
  const pageArray = Array.from({ length: maxPage }, (_, i) => i + 1);

  const previous = () => {
    if (page === 1) {
      return
    }
    setPage(page - 1);
  };

  const next = () => {
    const tp = count/perPage;
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
              className={`${page===1 ? "text-[#919EAB]" : "text-[#EBECF2]"}`}
              width={20}
              height={20}
            />
          </span>
        </button>
        <div className="flex gap-2 ml-[10px]">
          {pageArray.map(p => (
            <button
              className={`${page===p ? "bg-[#919EAB14]" : "bg-transparent"} w-[32px] h-[32px]`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
        <button className="inline-flex p-2 ml-[10px]" onClick={() => next()}>
          <span>
            <ChevronRightIcon
              className={`${page===maxPage ? "text-[#919EAB]" : "text-[#EBECF2]"}`}
              width={20}
              height={20}
            />
          </span>
        </button>
      </div>
    </div>
  );
}

export default TablePagination2;
