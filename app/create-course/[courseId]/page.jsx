"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";

const CourseLayout = () => {
  const { user } = useUser();
  const params = useParams();

  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (params?.courseId && user) {
      GetCourse();
    }
  }, [params, user]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList?.createdBy, user.primaryEmailAddress.emailAddress)
        )
      );

      setCourse(result[0])
    console.log(result);
  };


  const GenerateChapterContent = () => {
    setLoading(true)
    const chapters = course?.courseOutput?.chapters
    
    chapters.forEach(async(chapter,index) => {
      const PROMPT = 'Explain the concept in detail on Topic: '+course?.courseOutput?.courseName+', Chapter:'+course?.courseOutput?.chapters[index]?.chapterName+', in JSON format with list of array with field as title , explanation on given chapter in detail, code example(code field in <precode> format if applicable';


      if(index<3){
        try {
          const result = await GenerateChapterContent_AI.sendMessage(PROMPT)
          console.log(result?.response?.text());

          //Generate video url

          //save chapter content + video url
          setLoading(false)
        } catch (error) {
        setLoading(false)
         console.log(error);
          
        }
      }
      
    });
  }

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
        <h2 className="font-bold text-center text-2xl">Course Layout</h2>

        <LoadingDialog loading={loading}/>

        {/* Basic Info  */}
        <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>
        {/* Course detail */}
        <CourseDetail course={course} />
        {/* List of lessons */}
        <ChapterList course={course} refreshData={()=>GetCourse()} />

          <Button onClick={GenerateChapterContent} className='my-10'>Generate Course Content</Button>
    </div>
  );
};

export default CourseLayout;
