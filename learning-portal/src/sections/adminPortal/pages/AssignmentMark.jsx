import React, { useState } from "react";
import { useGetAssignmentMarkQuery } from "../../../features/adminFeatures/assignment-mark/assignmentMarkApi";
import Error from "../../../ui/Error";
import NavbarAdmin from "../components/NavbarAdmin";

const AssignmentMark = () => {
  const [assMark, setAssMark] = useState(0);
  const {
    data: assignmentMarkList,
    isError,
    isLoading,
    error,
  } = useGetAssignmentMarkQuery();

  let content = null;
  if (isLoading)
    content = (
      <tr>
        <td>Loading Assignment Mark...</td>
      </tr>
    );
  if (!isLoading && isError) content = <Error message={error?.data} />;
  if (!isLoading && !isError && assignmentMarkList.length === 0)
    content = (
      <tr>
        <td>No Assignment Mark Found!</td>
      </tr>
    );
  if (!isLoading && !isError && assignmentMarkList.length > 0)
    content = assignmentMarkList?.map((assignment) => {
      const { title, student_name, repo_link, createdAt, mark, status, id } =
        assignment || {};
      return (
        <tr key={id}>
          <td className="table-td">{title}</td>
          <td className="table-td">{createdAt}</td>
          <td className="table-td">{student_name}</td>
          <td className="table-td">{repo_link}</td>
          <td className="table-td">{mark}</td>
        </tr>
      );
    });

  return (
    <>
      <NavbarAdmin />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>4</span>
              </li>
              <li>
                Pending <span>3</span>
              </li>
              <li>
                Mark Sent <span>1</span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Mark</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  <tr>
                    <td className="table-td">
                      Assignment 1 - Implement Debounce Function
                    </td>
                    <td className="table-td">10 Mar 2023 10:58:13 PM</td>
                    <td className="table-td">Saad Hasan</td>
                    <td className="table-td">
                      https://github.com/Learn-with-Sumit/assignment-1
                    </td>
                    <td className="table-td input-mark">
                      <input
                        max="100"
                        min="0"
                        type="number"
                        value={assMark}
                        onChange={(e) => setAssMark(e.target.value)}
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </td>
                  </tr>
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AssignmentMark;
