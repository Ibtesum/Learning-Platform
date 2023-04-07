import React, { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import { useNavigate } from "react-router-dom";
import { useAddAssignmentMutation } from "../../../features/adminFeatures/assignments/assignmentsApi";
import { useGetVideosQuery } from "../../../features/adminFeatures/videos/videosApi";

const AddAssignment = () => {
  const [title, setTitle] = useState("");
  const [video_title, setVideo_title] = useState("");
  const [totalMark, setTotalMark] = useState(100);
  const [video_id, setVideo_id] = useState(0);

  console.log("videoTItle :", video_title);
  console.log("videoid :", video_id);

  const navigate = useNavigate();

  const [addAssignment, { isSuccess }] = useAddAssignmentMutation();

  const { data: videos, isSuccess: isVideosSuccess } = useGetVideosQuery();

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/assignment");
    }
  }, [isSuccess, navigate]);

  const handleSelectChange = (e) => {
    setVideo_title(e.target.value);
    const vid = videos.find((video) => video.title === e.target.value).id;
    setVideo_id(vid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAssignment({
      title,
      video_title,
      totalMark,
      video_id,
    });
  };

  return (
    <>
      <NavbarAdmin />
      <div className="m-10 p-10">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-white"
              >
                Assignment Title
              </label>
              <input
                type="text"
                id="title"
                className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write the assignment title here.."
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Select Video Title
              </label>
              <select
                name="video_title"
                id="video_title"
                required
                className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                onChange={handleSelectChange}
              >
                <option value="" hidden>
                  Select Video Title Here
                </option>

                {isVideosSuccess &&
                  videos?.map((video) => (
                    <option
                      key={video.id}
                      value={video.title}
                      className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    >
                      {video.title}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="mark"
                className="block mb-2 text-sm font-medium text-white"
              >
                Total Mark
              </label>
              <input
                type="number"
                id="mark"
                className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your video url here..."
                required
                value={totalMark}
                onChange={(e) => setTotalMark(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white border border-blue-300 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-1/2 sm:w-auto px-5 py-2.5 text-center bg-blue-500 hover:bg-blue-700 focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddAssignment;
