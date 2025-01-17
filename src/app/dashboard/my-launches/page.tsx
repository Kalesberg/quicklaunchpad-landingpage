
"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { getMyLaunches } from "app/api";
import clsx from "clsx";
import Button from "components/common/Button";
import TablePagination from "components/common/TablePagination";
import { useSelector } from "react-redux";
import { User } from "state/type";
import { useRouter } from "next/navigation";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { signInWithWallet } from "app/service/userService";
import { useDispatch } from 'react-redux';
import { updateUser } from "../../../reduxStore/rootReducer";
import { ProStatus } from "state/type";
import { getProjectStatus } from "utils/project";
import { getTableData } from "./service";

export default function MyLaunchesPage() {
  const { user } = useSelector((state: { user: User }) => state || {});
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);

  const [myLaunchesInfo, setMyLaunchesInfo] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const dispatch = useDispatch();
  const router = useRouter();


  const signIn = useCallback(async () => {
    if (user || !address || !chainId) {
      return
    }
    const res = await signInWithWallet(address, chainId as number)
    if (res) {
      dispatch(updateUser(res));
    }
  }, [address, user]);

  useEffect(() => {
    signIn();
  }, [signIn]);

  const getLaunches = useCallback(async () => {
    if (!user) {
      return;
    }
    const res = await getMyLaunches(user.uid as string);
    const projects = res.map((p: any) => {
      const contribution = p.contributions.find((c: any) => c.eoa === user.uid);
      const participate = p.allocation.participants.find((f: any) => f.eoa === user.uid);
      const status = getProjectStatus(p, user?.uid);
      const tableData = getTableData(p, status, user?.uid)
      return {
        ...p,
        contribution,
        participate,
        tableData,
        status
      }
    });
    const launchesInfo = [
      {
        name: "Launches Participated",
        value: projects.filter((p:any) => !!p.participate).length ?? 0,
      },
      {
        name: "Total Contributed",
        value: projects.filter((p:any) => !!p.contribution).length,
      },
      {
        name: "Largest Contribution",
        value: `$${projects.filter((p:any) => !!p.contribution).reduce((acc: number, p: any) => {
          if (+p.contribution.formattedAmount > acc) {
            acc = +p.contribution.formattedAmount
          }
          return acc
        }, 0) ?? 0}`,
      },
    ];
    setProjects(projects);
    setMyLaunchesInfo(launchesInfo);
  }, [user]);

  useEffect(() => {
    const filtered = projects.filter((p: any) => p.projectName.toLowerCase()
      .includes(searchValue.toLowerCase()));
    setFilteredProjects(filtered);
  }, [searchValue, projects]);


  useEffect(() => {
    getLaunches();
  }, [getMyLaunches, user]);

  return (
    <div className="container-dashboard mx-auto px-4 md:px-14 xl:px-24">
      <p className="text-lg font-bold mb-6">My Launches</p>
      <p className="text-sm text-[#637381] leading-6 py-4 mb-4">
        Keep track of all your launches and participation details.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myLaunchesInfo.map((info, index) => (
          <div key={index} className="bg-[#1B1E29] rounded-2xl p-6">
            <h3 className="text-[#EBECF2] text-sm font-semibold leading-5">
              {info.name}
            </h3>
            <p className="text-[#EBECF2] text-2xl font-bold leading-9 py-4">
              {info.value}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-[#1b1d26] rounded-2xl mt-8">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2 min-w-[320px] text-[#696C80] border border-[#919EAB33] rounded-lg px-[14px] py-3">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.71 19.3017L17.31 15.9117C18.407 14.5142 19.0022 12.7884 19 11.0117C19 9.42947 18.5308 7.88275 17.6518 6.56716C16.7727 5.25157 15.5233 4.22619 14.0615 3.62069C12.5997 3.01518 10.9911 2.85676 9.43928 3.16544C7.88743 3.47412 6.46197 4.23605 5.34315 5.35487C4.22433 6.47369 3.4624 7.89915 3.15372 9.451C2.84504 11.0028 3.00347 12.6114 3.60897 14.0732C4.21447 15.535 5.23985 16.7844 6.55544 17.6635C7.87103 18.5425 9.41775 19.0117 11 19.0117C12.7767 19.0139 14.5025 18.4187 15.9 17.3217L19.29 20.7217C19.383 20.8155 19.4936 20.8898 19.6154 20.9406C19.7373 20.9914 19.868 21.0175 20 21.0175C20.132 21.0175 20.2627 20.9914 20.3846 20.9406C20.5064 20.8898 20.617 20.8155 20.71 20.7217C20.8037 20.6288 20.8781 20.5182 20.9289 20.3963C20.9797 20.2744 21.0058 20.1437 21.0058 20.0117C21.0058 19.8797 20.9797 19.749 20.9289 19.6271C20.8781 19.5053 20.8037 19.3947 20.71 19.3017ZM5 11.0117C5 9.82503 5.3519 8.665 6.01119 7.6783C6.67047 6.69161 7.60755 5.92257 8.7039 5.46845C9.80026 5.01432 11.0067 4.8955 12.1705 5.12701C13.3344 5.35852 14.4035 5.92997 15.2426 6.76908C16.0818 7.6082 16.6532 8.67729 16.8847 9.84118C17.1162 11.0051 16.9974 12.2115 16.5433 13.3078C16.0892 14.4042 15.3201 15.3413 14.3334 16.0005C13.3467 16.6598 12.1867 17.0117 11 17.0117C9.4087 17.0117 7.88258 16.3796 6.75736 15.2544C5.63214 14.1291 5 12.603 5 11.0117Z"
                fill="#696C80"
              />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-[#696C80] placeholder-[#696C80] text-sm focus:outline-none"
              value={searchValue}
              onChange={(evt: any) => setSearchValue(evt.target.value)}    
            />
          </div>
          <div className="flex items-center gap-2">
            <Button className="flex items-center gap-2 bg-transparent !text-sm !text-[#448AFF] font-bold px-2 hover:!text-white">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.12484 10.0119C8.12484 9.5146 8.32238 9.03769 8.67401 8.68606C9.02564 8.33443 9.50256 8.13688 9.99984 8.13688C10.4971 8.13688 10.974 8.33443 11.3257 8.68606C11.6773 9.03769 11.8748 9.5146 11.8748 10.0119C11.8748 10.5092 11.6773 10.9861 11.3257 11.3377C10.974 11.6893 10.4971 11.8869 9.99984 11.8869C9.50256 11.8869 9.02564 11.6893 8.67401 11.3377C8.32238 10.9861 8.12484 10.5092 8.12484 10.0119Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.6665 10.0119C1.6665 11.3785 2.02067 11.8377 2.729 12.7585C4.14317 14.5952 6.51484 16.6785 9.99984 16.6785C13.4848 16.6785 15.8565 14.5952 17.2707 12.7585C17.979 11.8385 18.3332 11.3777 18.3332 10.0119C18.3332 8.64521 17.979 8.18605 17.2707 7.26522C15.8565 5.42855 13.4848 3.34521 9.99984 3.34521C6.51484 3.34521 4.14317 5.42855 2.729 7.26522C2.02067 8.18688 1.6665 8.64605 1.6665 10.0119ZM9.99984 6.88688C9.17104 6.88688 8.37618 7.21612 7.79013 7.80217C7.20408 8.38822 6.87484 9.18308 6.87484 10.0119C6.87484 10.8407 7.20408 11.6355 7.79013 12.2216C8.37618 12.8076 9.17104 13.1369 9.99984 13.1369C10.8286 13.1369 11.6235 12.8076 12.2095 12.2216C12.7956 11.6355 13.1248 10.8407 13.1248 10.0119C13.1248 9.18308 12.7956 8.38822 12.2095 7.80217C11.6235 7.21612 10.8286 6.88688 9.99984 6.88688Z"
                />
              </svg>
              Columns
            </Button>
            <Button className="flex items-center gap-2 bg-transparent !text-sm !text-[#448AFF] font-bold px-2 hover:!text-white">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.6666 13.7617C11.9876 13.7619 12.2962 13.8855 12.5286 14.1071C12.7609 14.3286 12.8991 14.631 12.9145 14.9516C12.9299 15.2723 12.8214 15.5866 12.6114 15.8294C12.4015 16.0722 12.1061 16.2249 11.7866 16.2559L11.6666 16.2617H8.33325C8.01224 16.2616 7.70359 16.1379 7.47126 15.9164C7.23894 15.6948 7.10074 15.3924 7.08531 15.0718C7.06989 14.7511 7.17841 14.4369 7.3884 14.1941C7.59838 13.9512 7.89374 13.7985 8.21325 13.7676L8.33325 13.7617H11.6666ZM14.1666 8.76172C14.4981 8.76172 14.816 8.89341 15.0505 9.12783C15.2849 9.36226 15.4166 9.6802 15.4166 10.0117C15.4166 10.3432 15.2849 10.6612 15.0505 10.8956C14.816 11.13 14.4981 11.2617 14.1666 11.2617H5.83325C5.50173 11.2617 5.18379 11.13 4.94937 10.8956C4.71495 10.6612 4.58325 10.3432 4.58325 10.0117C4.58325 9.6802 4.71495 9.36226 4.94937 9.12783C5.18379 8.89341 5.50173 8.76172 5.83325 8.76172H14.1666ZM16.6666 3.76172C16.9981 3.76172 17.316 3.89341 17.5505 4.12784C17.7849 4.36226 17.9166 4.6802 17.9166 5.01172C17.9166 5.34324 17.7849 5.66118 17.5505 5.8956C17.316 6.13002 16.9981 6.26172 16.6666 6.26172H3.33325C3.00173 6.26172 2.68379 6.13002 2.44937 5.8956C2.21495 5.66118 2.08325 5.34324 2.08325 5.01172C2.08325 4.6802 2.21495 4.36226 2.44937 4.12784C2.68379 3.89341 3.00173 3.76172 3.33325 3.76172H16.6666Z" />
              </svg>
              Filters
            </Button>
            <Button className="flex items-center gap-2 bg-transparent !text-sm !text-[#448AFF] font-bold px-2 hover:!text-white">
              Sort by: Status
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.0002 12.9296C9.80546 12.93 9.61676 12.8622 9.46683 12.7379L4.46683 8.57128C4.11245 8.27673 4.06395 7.75066 4.3585 7.39628C4.65305 7.04189 5.17912 6.99339 5.5335 7.28794L10.0002 11.0213L14.4668 7.42128C14.639 7.28147 14.8598 7.21605 15.0803 7.23951C15.3009 7.26298 15.5029 7.37338 15.6418 7.54628C15.7961 7.71949 15.8712 7.94917 15.8491 8.18008C15.8269 8.41098 15.7096 8.6222 15.5252 8.76294L10.5252 12.7879C10.3709 12.8925 10.1861 12.9424 10.0002 12.9296Z" />
              </svg>
            </Button>
          </div>
        </div>
        <>
          {/* Desktop Table */}
          <div className="hidden md:block w-full overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="max-h-14 w-full h-full text-[#C7CAD9] text-sm text-left font-semibold border-b border-[#82b1ff14]">
                  <th className="h-14 py-1.5 px-4 pl-6">
                    <span className="flex justify-start items-center gap-1 cursor-pointer">
                      Launch Name
                    </span>
                  </th>
                  <th className="h-14 py-1.5 px-4">
                    <span className="flex justify-start items-center gap-1 cursor-pointer">
                      Contribution
                    </span>
                  </th>
                  <th className="h-14 py-1.5 px-4">
                    <span className="flex justify-start items-center gap-1 cursor-pointer">
                      Token Allocation
                    </span>
                  </th>
                  <th className="h-14 py-1.5 px-4">
                    <span className="flex justify-start items-center gap-1 cursor-pointer">
                      Status
                    </span>
                  </th>
                  <th className="h-14 py-1.5 px-4">
                    <span className="flex justify-start items-center gap-1 cursor-pointer">
                      Launch Phase
                    </span>
                  </th>
                  <th className="h-14 py-1.5 px-4 pr-6"></th>
                </tr>
              </thead>

              <tbody>
                {filteredProjects && filteredProjects.map((row, index) => (
                  <tr
                    key={index}
                    className="text-[#EBECF2] text-base font-normal border-b border-[#282D3D80]"
                  >
                    <td className="py-1.5 px-4 pl-6 min-h-14">
                      <span>{row.projectName}</span>
                    </td>

                    <td className="py-1.5 px-4 min-h-14">
                      <div className="flex justify-start">
                        <a href="#">
                          <small className="text-sm"> {row.contribution ? `$${row.contribution.formattedAmount}` : '-'}</small>
                        </a>
                      </div>
                    </td>

                    <td className="py-1.5 px-4 min-h-14">
                      <small className="text-sm">
                        {row.participate ? `$${row.participate.amount}` : '-'}
                      </small>
                    </td>

                    <td className="py-1.5 px-4 min-h-14">
                      <span
                          className={`max-w-20 md:max-w-full md:min-w-24 h-[24px] px-2 py-1 rounded-md text-xs text-center font-bold ${
                            row.status === "upcoming" || row.status === "tba"
                              ? "bg-[#FDD83529] text-[#FDD835]"
                              : row.status === "completed"
                                ? "bg-[#8E33FF29] text-[#C684FF]"
                                : "bg-[#0FC67929] text-[#0FC679]"
                          }`}
                        >
                          {row.status === "upcoming" || row.status === "tba"
                            ? "Upcoming"
                            : row.status === "completed"
                              ? "Closed"
                              : "Open"}
                        </span>
                      </td>
                    <td className="py-1.5 px-4 min-h-14">
                      <div className="flex flex-col justify-start">
                          {row.tableData.phase.map((p: String) => <span className="text-[#C7CAD9] text-xs capitalize block">
                            {p}
                          </span>)}
                      </div>
                    </td>
                    <td className="py-1.5 px-4 pr-6 min-h-14 float-end">
                      <Button
                        className={clsx({
                          ["min-w-[168px] !h-9 px-3 !rounded-lg !text-sm capitalize"]:
                            true,
                          ["!bg-[#448AFF14] !text-[#448AFF]"]:row.tableData.btn === 'View Details',
                        })}
                        onClick={() =>
                          router.push(`/dashboard/launch-info/${row.pid}?status=${row.status}`)
                        }
                      >
                        {row.tableData.btn}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination count={projects.length} />
        </>
      </div>
    </div>
  );
}
