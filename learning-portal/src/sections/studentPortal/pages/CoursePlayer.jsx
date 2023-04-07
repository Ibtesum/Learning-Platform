import React from "react";
import NavbarStudent from "../components/NavbarStudent";
import {
  useGetVideoQuery,
  useGetVideosQuery,
} from "../../../features/adminFeatures/videos/videosApi";
import VideoListCard from "../components/VideoListCard";
import VideoPlayer from "../components/VideoPlayer";
import { useParams } from "react-router-dom";

const CoursePlayer = () => {
  const { vId } = useParams();
  console.log(vId);
  const {
    data: videos,
    isError,
    isLoading,
    error,
    isSuccess,
  } = useGetVideosQuery();

  const { data: playingVideo } = useGetVideoQuery(vId, {
    skip: vId === undefined,
  });

  // const playingVideo = videos?.find((video) => video.id === vId);

  return (
    <>
      <NavbarStudent />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <VideoPlayer
              playingVideo={
                playingVideo ? playingVideo : isSuccess ? videos[0] : {}
              }
            />
            <VideoListCard
              playingVideo={
                playingVideo ? playingVideo : isSuccess ? videos[0] : {}
              }
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursePlayer;
