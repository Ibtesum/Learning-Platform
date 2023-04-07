import React, { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import { useAddVideoMutation } from "../../../features/adminFeatures/videos/videosApi";
import { useNavigate } from "react-router-dom";

const AddVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");

  const navigate = useNavigate();

  const [addVideo, { data, isLoading, isError, error, isSuccess }] =
    useAddVideoMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/videos");
    }
  }, [isSuccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addVideo({
      title,
      description,
      url,
      views,
      duration,
      createdAt: new Date(),
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
                Video Title
              </label>
              <input
                type="text"
                id="title"
                className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write the video title here.."
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-white"
              >
                Video Description
              </label>
              <input
                type="text"
                id="description"
                className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your video description here.."
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="url"
                className="block mb-2 text-sm font-medium text-white"
              >
                Video Url
              </label>
              <input
                type="url"
                id="url"
                className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your video url here..."
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="views"
                className="block mb-2 text-sm font-medium text-white"
              >
                Video Views
              </label>
              <input
                type="text"
                id="views"
                className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="51.2K"
                required
                value={views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="duration"
                className="block mb-2 text-sm font-medium text-white"
              >
                Video Duration
              </label>
              <input
                type="text"
                id="duration"
                className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="5:30"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
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

export default AddVideo;
