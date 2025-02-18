"use client"
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ChapterListCard from './_components/ChapterListCard';

const CourseStart = () => {
    const params = useParams()

    const [course,setCourse] = useState()
    const [selectedChapter, setSelectedChapter] = useState()

    useEffect(()=>{
        GetCourse()
    },[])

    const GetCourse = async() => {
        const results = await db.select().from(CourseList).where(eq(CourseList?.courseId, params?.courseId))

        setCourse(results[0])
    }


    return (
        <div>
            {/* chapter list sidebar */}
            <div className='md:w-64 hidden md:block h-screen  border-r shadow-sm '>
                <h2 className='font-medium text-white text-lg bg-primary p-3'>{course?.courseOutput?.courseName}</h2>
                
                <div>
                    {course?.courseOutput?.chapters.map((chapter,index)=>(
                        <div key={index} className={`cursor-pointer hover:bg-purple-50 ${selectedChapter.name == chapter?.chapterName && 'bg-purple-100'}`}
                        onClick={()=>setSelectedChapter(chapter)}>
                        
                            <ChapterListCard chapter={chapter} index={index}/>
                        </div>
                    ))}
                </div>
            </div>
            {/* content  */}
            <div className='md:ml-64 '>

            </div>
        </div>
    );
}

export default CourseStart;
