import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
} from "../../../features/adminFeatures/assignments/assignmentsApi";
import { useGetQuizzesQuery } from "../../../features/adminFeatures/quizzes/quizzesApi";
import Quiz from "../pages/Quiz";

const VideoPlayer = ({ playingVideo }) => {
  const { id, title, description, url, createdAt } = playingVideo || {};

  // Getting all the assignments from DB and checking whether this particular video contains any assignments or not.
  const { data: assignments, isLoading, isSuccess } = useGetAssignmentsQuery();
  const assignmentForThisVideo = assignments?.find(
    (assignment) => assignment.video_title === title
  );

  // Getting all the quizzes from DB and checking whether this particular video contains any quizzes or not.
  const { data: quizzes } = useGetQuizzesQuery();
  const quizzesForThisVideo = quizzes?.filter(
    (quiz) => quiz.video_title === title
  );
  console.log(quizzesForThisVideo);

  // converting the published date to desired format with the moment package.
  const time = moment(createdAt).format("MMM Do YY");

  const [opened, setOpened] = useState(false);

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  return (
    <>
      <div className="col-span-full w-full space-y-8 lg:col-span-2">
        <iframe
          width="100%"
          className="aspect-video"
          src={url}
          title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-100">
            {title}
          </h1>
          <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
            Uploaded on {time}
          </h2>

          <div className="flex gap-4">
            <Link
              className={`px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary ${
                !assignmentForThisVideo && "hidden"
              }`}
            >
              এসাইনমেন্ট
            </Link>

            <div
              className={`px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary ${
                !quizzesForThisVideo && "hidden"
              } `}
              onClick={controlModal}
            >
              কুইজে অংশগ্রহণ করুন
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
        </div>
      </div>
      <Quiz quizs={quizzesForThisVideo} open={opened} control={controlModal} />
    </>
  );
};

export default VideoPlayer;
