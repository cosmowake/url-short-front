"use client";

import { useDeleteUrlMutation, useGetUrlListQuery } from "@/api/urlApiSlice";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { logOut } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";

export default function Admin() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size] = useState(8);
  const {
    data,
    isLoading: isLoadingUrlList,
    refetch: refetchUrlList,
  } = useGetUrlListQuery({ size, page });
  const [deleteUrl, { isLoading: isLoadingDeleteUrl }] = useDeleteUrlMutation();

  useEffect(() => {
    if (!data?.totalCount) return;
    if (Math.ceil(data.totalCount / size) <= page) setPage((s) => s - 1);
  }, [data]);

  return (
    <>
      <div
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => dispatch(logOut())}
      >
        <ArrowLeftStartOnRectangleIcon width={24} height={24} />
      </div>
      <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-xl">Admin page</h1>
        {!isLoadingUrlList && data?.items && (
          <>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table max-w-[600px]">
                <thead>
                  <tr>
                    <th></th>
                    <th>Alias</th>
                    <th>Url</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr key={item.id}>
                      <th>{item.id}</th>
                      <td>{item.alias}</td>
                      <td className="max-w-[600px]">
                        {/* className="tooltip" data-tip={item.url} */}
                        <div>
                          <div className="max-w-[600px] truncate">
                            {item.url}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          className={classNames("cursor-pointer", {
                            "opacity-25 pointer-events-none":
                              isLoadingDeleteUrl,
                          })}
                          onClick={async () => {
                            await deleteUrl({ id: item.id });
                            await refetchUrlList();
                          }}
                        >
                          <TrashIcon width={20} height={20} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.totalCount && (
              <Pagination
                count={Math.ceil(data.totalCount / size)}
                active={page}
                setActive={setPage}
                maxSize={4}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
