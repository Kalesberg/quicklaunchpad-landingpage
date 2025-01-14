import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";

export default function TablePagination({ count }: { count: number }) {
  return (
    <div className="overflow-auto text-sm px-6 ">
      <div className="relative min-h-16 flex items-center text-[#C7CAD9]">
        <div className="flex-[1_1_100%]"></div>
        <p className="hidden sm:block text-sm font-medium leading-[1.43] flex-shrink-0 ">
          Rows per page:
        </p>
        <div className="hidden sm:block ml-2 mr-8">
          <div className="relative inline-flex items-center text-sm font-medium leading-[1.1876em] cursor-pointer box-border">
            10
            <ChevronDownIcon
              className="text-[#C7CAD9]"
              width={16}
              height={16}
            />
          </div>
        </div>
        <p className="text-sm font-medium leading-[1.43] flex-shrink-0">
          1 - 6 of {count}
        </p>
        <div className="ml-[20px] flex-shrink-0">
          <button className="inline-flex p-2">
            <span>
              <ChevronLeftIcon
                className="text-inherit md:text-[#C7CAD9]"
                width={20}
                height={20}
              />
            </span>
          </button>
          <button className="inline-flex p-2">
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
