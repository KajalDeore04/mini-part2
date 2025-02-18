"use client";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
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
import service from "@/configs/service";
import { useRouter } from "next/navigation";

const CourseLayout = () => {
  const { user } = useUser();
  const params = useParams();
  const router = useRouter();

  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);

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

    setCourse(result[0]);
    console.log("Course Fetched");
  };

  const GenerateChapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.chapters;
  
    for (let index = 0; index < chapters.length; index++) {
      try {
        const chapter = chapters[index];
        const PROMPT =
          "Explain the concept in detail on Topic: " +
          course?.courseOutput?.courseName +
          ", Chapter:" +
          chapter?.chapterName +
          ", in JSON format with list of array with field as title , explanation on given chapter in detail, code example(code field in <precode> format if applicable";
  
        // Generate video URL
        let videoId = "";
        const videoResponse = await service.getVideos(
          course?.courseOutput?.courseName + ":" + chapter?.chapterName
        );
  
        if (videoResponse?.length > 0) {
          videoId = videoResponse[0]?.id?.videoId || "";
        }
  
        // Generate chapter content
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        const content = JSON.parse(result?.response?.text());
  
        // Save chapter content + video URL
        await db.insert(Chapters).values({
          chapterId: index,
          courseId: course.courseId,
          content: content,
          videoId: videoId,
        });
  
        console.log(`Saved Chapter ${index + 1}:`);
      } catch (error) {
        console.log("Error generating chapter content:", error);
      }
    }
  
    setLoading(false);
    
    // Update course data
    await db.update(CourseList).set({ publish: true });
    await GetCourse(); // Refresh course data after update
    router.replace("/create-course/" + course?.courseId + "/finish");
  };
  

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      <LoadingDialog loading={loading} />

      {/* Basic Info  */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
      {/* Course detail */}
      <CourseDetail course={course} />
      {/* List of lessons */}
      <ChapterList course={course} refreshData={() => GetCourse()} />

      <Button onClick={GenerateChapterContent} className="my-10">
        Generate Course Content
      </Button>
    </div>
  );
};

export default CourseLayout;
