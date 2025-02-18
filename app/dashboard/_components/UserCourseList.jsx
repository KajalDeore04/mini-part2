"use client"
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';

const UserCourseList = () => {
    const {user} = useUser();
    const {userCourseList, setUserCourseList} = useContext(UserCourseListContext)

    const [courseList, setCourseList] = useState([]);

    useEffect(()=>{
        user && getUserCourses()
    },[user])

    const getUserCourses =async () => {
        const result = await db.select().from(CourseList).where(eq(CourseList.createdBy,user?.primaryEmailAddress.emailAddress))

        console.log("Course Fetched");
        setCourseList(result)
        setUserCourseList(result)
        
    }
    return (
        <div className='mt-10'>
            <h2 className='font-medium text-xl '>My AI Courses</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5'>
                {courseList?.length>0? courseList?.map((course,index)=>(
                        <CourseCard course={course} key={index} refreshData={()=>getUserCourses()} />
                ))
                :
                
                    courseList.map((item,index)=>(
                       <div key={index} className=' w-full bg-slate-200 animate-pulse rounded-lg h-[200px] mt-8'>
                       </div> 
                    ))
                
            }
            </div>
        </div>
    );
}

export default UserCourseList;
