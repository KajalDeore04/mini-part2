import React from "react";
import { HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi2";
import EditChapters from "./EditChapters";

const ChapterList = ({ course, refreshData }) => {
  return (
    <div className="mt-3 ">
      <h2 className="font-medium text-xl">Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.chapters.map((chapter, index) => (
          <div
            key={index}
            className="border p-5 rounded-lg mb-2 flex items-center justify-between"
          >
            <div className="flex gap-5 items-center">
              <h2 className="bg-primary h-10 w-10 text-white rounded-full flex-none text-center p-2">
                {index + 1}
              </h2>
              <div className="">
                <h2 className="font-medium  text-lg">
                  {chapter?.chapterName.match(/^Chapter \d+:/)
                    ? chapter.chapterName.split(":").slice(1).join(":").trim()
                    : chapter.chapterName}{" "}
                  <EditChapters
                    index={index}
                    course={course}
                    refreshData={() => refreshData(true)}
                  />
                </h2>
                <p className="text-sm text-gray-500">{chapter?.about}</p>
                <p className="flex gap-2 text-primary items-center">
                  <HiOutlineClock /> {chapter?.duration}
                </p>
              </div>
            </div>
            <HiOutlineCheckCircle className="text-4xl text-gray-300 flex-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
