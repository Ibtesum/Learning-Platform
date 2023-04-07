import React, { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import { useNavigate } from "react-router-dom";
import { useAddAssignmentMutation } from "../../../features/adminFeatures/assignments/assignmentsApi";
import { useGetVideosQuery } from "../../../features/adminFeatures/videos/videosApi";
import { useAddQuizMutation } from "../../../features/adminFeatures/quizzes/quizzesApi";

const AddQuiz = () => {
  const [question, setQuestion] = useState("");
  const [video_id, setVideo_id] = useState(0);
  const [video_title, setVideo_title] = useState("");
  const [options, setOptions] = useState([]);
  console.log(options);

  // For Handling OPTION ONE
  const [options1, setOption1] = useState({});
  const [checked1, setChecked1] = useState(false);
  const [option1Ans, setOption1Ans] = useState("");
  const handleOption1Click = () => {
    setOption1({
      id: 1,
      option: option1Ans,
      isCorrect: checked1,
    });
  };
  // For Handling OPTION TWO
  const [options2, setOption2] = useState({});
  const [checked2, setChecked2] = useState(false);
  const [option2Ans, setOption2Ans] = useState("");
  const handleOption2Click = () => {
    setOption2({
      id: 2,
      option: option2Ans,
      isCorrect: checked2,
    });
  };
  // For Handling OPTION THREE
  const [options3, setOption3] = useState({});
  const [checked3, setChecked3] = useState(false);
  const [option3Ans, setOption3Ans] = useState("");
  const handleOption3Click = () => {
    setOption3({
      id: 3,
      option: option3Ans,
      isCorrect: checked3,
    });
  };
  // For Handling OPTION FOUR
  const [options4, setOption4] = useState({});
  const [checked4, setChecked4] = useState(false);
  const [option4Ans, setOption4Ans] = useState("");
  const handleOption4Click = () => {
    setOption4({
      id: 4,
      option: option4Ans,
      isCorrect: checked4,
    });
  };

  // For setting each and every options in the "options" state
  useEffect(() => {
    if (
      options1 !== {} &&
      options2 !== {} &&
      options3 !== {} &&
      options4 !== {}
    ) {
      setOptions([options1, options2, options3, options4]);
    }
  }, [options1, options2, options3, options4, setOptions]);

  const navigate = useNavigate();

  const [addQuiz, { data, isSuccess }] = useAddQuizMutation();
  const { data: videos, isSuccess: isVideosSuccess } = useGetVideosQuery();

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/quizzes");
    }
  }, [isSuccess, navigate]);

  const handleSelectChange = (e) => {
    setVideo_title(e.target.value);
    const vid = videos.find((video) => video.title === e.target.value).id;
    setVideo_id(vid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuiz({
      question,
      video_id,
      video_title,
      options,
    });
  };

  return (
    <>
      <NavbarAdmin />
      <div className="m-10 p-10">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Question
              </label>
              <input
                type="text"
                id="title"
                className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write the question here..."
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Select Video Here
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
              <div className=" flex gap-5 justify-between">
                <label className="block mb-2 text-sm font-medium text-white">
                  Option 1
                </label>

                <div className="flex gap-2 ">
                  <label>Check if this is correct</label>
                  <input
                    type="checkbox"
                    className=" border rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    checked={checked1}
                    onChange={(e) => setChecked1(e.target.checked)}
                  />
                </div>
              </div>
              <input
                type="text"
                id="title"
                className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write the question here..."
                required
                value={option1Ans}
                onChange={(e) => setOption1Ans(e.target.value)}
              />
              <button
                type="button"
                className="text-white border border-white-300 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center bg-gray-500 hover:bg-gray-700 focus:ring-blue-800 mt-1"
                onClick={handleOption1Click}
              >
                Done
              </button>
            </div>
            <div>
              <div className=" flex gap-5 justify-between">
                <label className="block mb-2 text-sm font-medium text-white">
                  Option 2
                </label>

                <div className="flex gap-2 ">
                  <label>Check if this is correct</label>
                  <input
                    type="checkbox"
                    className=" border rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    checked={checked2}
                    onChange={(e) => setChecked2(e.target.checked)}
                  />
                </div>
              </div>
              <input
                type="text"
                id="title"
                className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write the question here..."
                required
                value={option2Ans}
                onChange={(e) => setOption2Ans(e.target.value)}
              />
              <button
                type="button"
                className="text-white border border-white-300 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center bg-gray-500 hover:bg-gray-700 focus:ring-blue-800 mt-1"
                onClick={handleOption2Click}
              >
                Done
              </button>
            </div>
            <div>
              <div className=" flex gap-5 justify-between">
                <label className="block mb-2 text-sm font-medium text-white">
                  Option 3
                </label>

                <div className="flex gap-2 ">
                  <label>Check if this is correct</label>
                  <input
                    type="checkbox"
                    className=" border rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    checked={checked3}
                    onChange={(e) => setChecked3(e.target.checked)}
                  />
                </div>
              </div>
              <input
                type="text"
                id="title"
                className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write the question here..."
                required
                value={option3Ans}
                onChange={(e) => setOption3Ans(e.target.value)}
              />
              <button
                type="button"
                className="text-white border border-white-300 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center bg-gray-500 hover:bg-gray-700 focus:ring-blue-800 mt-1"
                onClick={handleOption3Click}
              >
                Done
              </button>
            </div>
            <div>
              <div className=" flex gap-5 justify-between">
                <label className="block mb-2 text-sm font-medium text-white">
                  Option 4
                </label>

                <div className="flex gap-2 ">
                  <label>Check if this is correct</label>
                  <input
                    type="checkbox"
                    className=" border rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    checked={checked4}
                    onChange={(e) => setChecked4(e.target.checked)}
                  />
                </div>
              </div>
              <input
                type="text"
                id="title"
                className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write the question here..."
                required
                value={option4Ans}
                onChange={(e) => setOption4Ans(e.target.value)}
              />
              <button
                type="button"
                className="text-white border border-white-300 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center bg-gray-500 hover:bg-gray-700 focus:ring-blue-800 mt-1"
                onClick={handleOption4Click}
              >
                Done
              </button>
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

export default AddQuiz;
