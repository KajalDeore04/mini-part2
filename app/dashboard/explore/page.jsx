"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Layers, MoreVertical, BookOpen, Eye, ArrowRight, Search, X } from "lucide-react";

const accentColors = [
  { color: "border-blue-500", icon: "text-blue-500", bg: "bg-blue-500", shadow: "shadow-blue-500/20" },
  { color: "border-green-500", icon: "text-green-500", bg: "bg-green-500", shadow: "shadow-green-500/20" },
  { color: "border-purple-500", icon: "text-purple-500", bg: "bg-purple-500", shadow: "shadow-purple-500/20" },
  { color: "border-orange-500", icon: "text-orange-500", bg: "bg-orange-500", shadow: "shadow-orange-500/20" },
];

const Explore = () => {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    GetAllCourses();
  }, [pageIndex]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCourses(courseList);
    } else {
      const filtered = courseList.filter(course => 
        course?.courseOutput?.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        course?.courseOutput?.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchTerm, courseList]);

  const GetAllCourses = async () => {
    const result = await db.select().from(CourseList).limit(6).offset(pageIndex * 6);
    setCourseList(result);
    setFilteredCourses(result);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const CourseCard = ({ course, displayUser = false, index }) => {
    const colorIndex = index % accentColors.length;
    const accent = accentColors[colorIndex];

    return (
      <Card className={`aspect-square overflow-hidden transition-all duration-500 hover:shadow-xl bg-black border border-zinc-800 hover:border-l-4 ${accent.color} group relative`}>
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-zinc-900 flex items-center justify-center text-white border border-zinc-700">
                {course?.createdBy?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <div className="text-sm text-zinc-400 truncate">
                {course?.createdBy?.split('@')[0] || "Anonymous"}
              </div>
            </div>
            <div className="bg-zinc-900 rounded-full p-1.5">
              <MoreVertical size={16} className="text-zinc-500" />
            </div>
          </div>
          
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1 rounded ${accent.icon}`}>
                <Layers size={18} />
              </div>
              <span className="text-xs bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded">
                {course?.courseOutput?.level}
              </span>
            </div>
            
            <h2 className="font-bold text-lg mb-3 text-white group-hover:text-zinc-100">
              {course?.courseOutput?.courseName}
            </h2>
            
            <p className="text-sm text-zinc-400  mb-4">
              {course?.courseOutput?.description || "Explore this course to discover more about the content and methodologies used to build AI-powered projects."}
            </p>
            
            <div className="mt-auto">
              <div className="flex items-center justify-between text-zinc-400 text-sm py-4 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className={accent.icon} />
                  <span>{course?.courseOutput?.noOfChapters} Chapters</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Eye-Catching View Button */}
          <Link href={"/course/" + course?.courseId} className="absolute bottom-4 right-4">
            <div className={`flex items-center gap-2 transition-all duration-300 ${accent.bg} text-black font-medium rounded-full py-2 px-4 hover:pr-6 hover:shadow-lg hover:scale-105`}>
              <Eye size={16} className="text-black" />
              <span>View Course</span>
              
            </div>
          </Link>
        </div>
      </Card>
    );
  };

  return (
    <div className="p-4 md:p-6 lg:p-8  text-white min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-6xl font-bold gradient-title">Explore Projects</h2>
          <p className="text-zinc-400">Explore projects built using AI by other users</p>
        </div>
        
        {/* Search Component */}
        <div className="relative w-full md:w-64 lg:w-80">
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-3 text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-10 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white transition-all"
            />
            {searchTerm && (
              <button 
                onClick={handleClearSearch}
                className="absolute right-3 text-zinc-500 hover:text-zinc-300 rounded-full p-1 hover:bg-zinc-800 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 gap-4 mb-10 ">
        {pageIndex !== 0 && !searchTerm && (
          <Button variant="outline" className="bg-black border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white" onClick={() => setPageIndex(pageIndex - 1)}>
            Previous Page
          </Button>
        )}
        {!searchTerm && (
          <Button className="ml-auto bg-white text-black hover:bg-zinc-200 hover:shadow-lg" onClick={() => setPageIndex(pageIndex + 1)}>
            Next Page
          </Button>
        )}
      </div>

      {filteredCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-zinc-900 p-4 rounded-full mb-4 border border-zinc-800">
            <Search size={32} className="text-zinc-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
          <p className="text-zinc-400 max-w-md">
            We couldn't find any courses matching "{searchTerm}". Try a different search term or browse all courses.
          </p>
          <Button 
            onClick={handleClearSearch} 
            className="mt-4 bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            Clear Search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <div key={course.id}>
              <CourseCard course={course} displayUser={true} index={index} />
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
};

export default Explore;