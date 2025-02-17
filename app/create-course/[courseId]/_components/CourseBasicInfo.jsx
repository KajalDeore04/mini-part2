import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { HiOutlinePuzzlePiece, HiPencilSquare } from "react-icons/hi2";
import EditCourseBasicInfo from "./EditCourseBasicInfo";


const CourseBasicInfo = ({ course, refreshData, edit=true }) => {
 

  
  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-48 ">
        <div>
          <h2 className="font-bold text-2xl">
            {course?.courseOutput?.courseName}{" "}
            { 
            edit &&            
            <EditCourseBasicInfo
              course={course}
              refreshData={() => refreshData(true)}
            />
            }
          </h2>
        
          <p className="text-s text-gray-400 mt-3">
            {course?.courseOutput?.description}
          </p>

          <h2 className="font-medium mt-5 flex gap-2 items-center text-primary">
            <HiOutlinePuzzlePiece />
            {course?.courseOutput?.category}
          </h2>
          <Button className="w-[50%] mt-5">Start</Button>
        </div>
          

      </div>
    </div>
  );
};

export default CourseBasicInfo;
