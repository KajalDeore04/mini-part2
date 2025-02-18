"use client";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import Header from "@/app/dashboard/_components/Header";

const CourseStart = () => {
  const params = useParams();

  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState();

  useEffect(() => {
    GetCourse();
  }, []);

  const GetCourse = async () => {
    const results = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));

    setCourse(results[0]);
    GetSelectedChapterContent(0)
  };

  const GetSelectedChapterContent = async (chapterId) => {
    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters.chapterId, chapterId),
          eq(Chapters.courseId, course?.courseId)
        )
      );
    setChapterContent(result[0]);
    console.log("Fetched Chapter Content");
  };

  return (
    <div>
      <Header />
      {/* chapter list sidebar */}
      <div className="fixed md:w-64 hidden md:block h-screen border-r shadow-sm overflow-y-auto pb-20">
        <h2 className="font-medium text-white text-lg bg-primary p-3">
          {course?.courseOutput?.courseName}
        </h2>

        <div>
          {course?.courseOutput?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-purple-50 ${
                selectedChapter?.name == chapter?.chapterName && "bg-purple-500"
              }`}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(index);
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* content */}
      <div className="md:ml-64">
        {selectedChapter == null ? (
          <h1 className="text-center flex items-center justify-center font-extrabold text-3xl mt-[20%]">
            Select the chapter you want to study...
          </h1>
        ) : (
          <ChapterContent chapter={selectedChapter} content={chapterContent} />
        )}
      </div>
    </div>
  );
};

export default CourseStart;
