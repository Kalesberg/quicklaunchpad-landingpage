"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";

const TablePagination: React.FC<{
  count: number;
  page: number;
  perPage: number;
  setPage: any;
  setPerPage: any;
}> = ({ count, page, perPage, setPage, setPerPage }) => {
  
  const perPages = [5, 10,  25];

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
    <div className="overflow-auto text-sm px-6 ">
      <div className="relative min-h-16 flex items-center text-[#C7CAD9]">
        <div className="flex-[1_1_100%]"></div>
        <p className="hidden sm:block text-sm font-medium leading-[1.43] flex-shrink-0 ">
          Rows per page:
        </p>
        <div className="hidden sm:block ml-2 mr-8">
          <select
            className="relative bg-[#1b1e29] focus:outline-none cursor-pointer"
            value={perPage}
            onChange={(e) => {
              setPerPage(e.target.value);
            }}
          >
            {perPages.map((col) => (
              <option className="text-[#C7CAD9] outline-none border-none cursor-pointer" value={col}>{col}</option>
            ))}
          </select>
        </div>
        <p className="text-sm font-medium leading-[1.43] flex-shrink-0">
          {(page - 1) * perPage + 1} - {page * perPage >= count ? count : page * perPage} of {count}
        </p>
        <div className="ml-[20px] flex-shrink-0">
          <button className="inline-flex p-2" onClick={() => previous()}>
            <span>
              <ChevronLeftIcon
                className="text-inherit md:text-[#C7CAD9]"
                width={20}
                height={20}
              />
            </span>
          </button>
          <button className="inline-flex p-2" onClick={() => next()}>
            <span>
              <ChevronRightIcon
                className="text-inherit md:text-[#C7CAD9]"
                width={20}
                height={20}
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TablePagination;
