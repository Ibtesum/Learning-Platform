import React from "react";
import { useGetVideosQuery } from "../../../features/adminFeatures/videos/videosApi";
import Error from "../../../ui/Error";
import { Link } from "react-router-dom";

const VideoListCard = ({ playingVideo }) => {
  const { data: videos, isError, isLoading, error } = useGetVideosQuery();

  let content = null;

  if (isLoading) content = <div>Loading Videos...</div>;

  if (!isLoading && isError) content = <Error message={error?.data} />;

  if (!isLoading && !isError && videos.length === 0)
    content = <div>No Video Found!!</div>;

  if (!isLoading && !isError && videos.length > 0)
    content = videos.map((video) => {
      const { id, title, description, url, views, duration, createdAt } = video;
      const bgColor = playingVideo?.id == id ? "bg-blue-900" : "bg-blue-00";
      return (
        <Link
          to={`/course-player/${id}`}
          key={id}
          className={`w-full flex flex-row gap-2 cursor-pointer  ${bgColor} hover:bg-slate-900 p-2 py-3 rounded-md`}
        >
          {/* <!-- Thumbnail --> */}

          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
            />
          </svg>
          {/* <!-- Description --> */}
          <div clas="flex flex-col w-full">
            <div>
              <p className="text-slate-50 text-sm font-medium">{title}</p>
            </div>
            <div>
              <span className="text-gray-400 text-xs mt-1">
                {duration} Mins
              </span>
              <span className="text-gray-400 text-xs mt-1"> | </span>
              <span className="text-gray-400 text-xs mt-1">{views} views</span>
            </div>
          </div>
        </Link>
      );
    });
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
};

export default VideoListCard;
