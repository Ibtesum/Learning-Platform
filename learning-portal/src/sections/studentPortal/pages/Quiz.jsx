import React from "react";

const Quiz = ({ quizs, open, control }) => {

  let quizContent = null;
   

  
  if (quizs?.length > 0) {
    quizContent = quizs?.map((q) => {
      const { id, question, video_title, options } = q;
      let optionsContent = null;
      if (options?.length > 0) {
        optionsContent = options.map((o) => {
          const { id, option, isCorrect } = o;
          return (
            <label key={id}>
              <input type="checkbox" />
              {option}
            </label>
          );
        });
      }
      return (
        <div className="quiz" key={id}>
          <h4 className="question">{question}</h4>
          <form className="quizOptions">
            {/* <!-- Option 1 --> */}
            {optionsContent}
          </form>
        </div>
      );
    });
  }
  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <section className=" py-6 p-10 bg-primary rounded w-[700px] lg:w-[900px] space-y-8 mt-30 absolute top-3/4 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">
                Quizzes for "{quizs[0].video_title}"
              </h1>
              <p className="text-sm text-slate-200">
                Each question contains 5 Mark
              </p>
            </div>
            <div className="space-y-8 ">
              {quizContent}
            </div>

            <button className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">
              Submit
            </button>
          </div>
        </section>
      </>
    )
  );
};

export default Quiz;
