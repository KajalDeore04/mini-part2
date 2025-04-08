"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft,
  BookOpen, 
  Play,
  Copy,
  Check
} from "lucide-react";

const CourseLayout = () => {
  const { user } = useUser();
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (params?.courseId && user) {
      getCourse();
    }
  }, [params, user]);

  const getCourse = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
        ));
      setCourse(result[0]);
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const url = `${process.env.NEXT_PUBLIC_HOST_NAME}/course/${course?.courseId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-white text-xl"
        >
          Loading course...
        </motion.div>
      </div>
    );
  }

  const courseUrl = `${process.env.NEXT_PUBLIC_HOST_NAME}/course/${course?.courseId}`;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border-b border-gray-800 sticky top-0 z-50 bg-black/90 backdrop-blur-sm"
      >
        <div className="container mx-auto px-8 h-16 flex items-center justify-between">
          <Button 
            onClick={() => router.push('/dashboard')}
            variant="ghost" 
            className="text-gray-400 hover:text-white hover:bg-gray-900 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </motion.header>

      <div className="container mx-auto px-20 py-12">
        {/* Course Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          {/* Course Category */}
          <motion.span 
            className="inline-block text-xs uppercase tracking-widest text-green-400 mb-6"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {course?.courseOutput?.category}
          </motion.span>
          
          {/* Course Title */}
          <h1 className="text-5xl font-bold gradient-title mb-8">{course?.courseOutput?.courseName}</h1>
          
          {/* Course Description */}
          {/* <p className="text-gray-400 text-lg max-w-3xl mb-8">
            {course?.courseOutput?.description}
          </p>
           */}
          {/* Share Link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800 mb-8"
          >
            <div className="flex-grow text-gray-300 truncate overflow-auto w-full sm:w-auto">
              {courseUrl}
            </div>
            
            <Button
              onClick={handleCopy}
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:text-white hover:border-white transition-all duration-300 whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-green-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </>
              )}
            </Button>
          </motion.div>
          
          {/* Start Button - Prominent Position */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            className="mb-12"
          >
            <Link href={`/course/${course?.courseId}/start`}>
              <Button className="bg-green-600 text-black hover:bg-gray-200 hover:shadow-lg px-8 py-6 text-lg font-medium transition-all duration-300 group">
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
                >
                  <Play className="mr-2 h-5 w-5 group-hover:text-purple-600 transition-colors duration-300" />
                </motion.div>
                Start 
              </Button>
            </Link>
          </motion.div>
          
        </motion.div>

        {/* Course Chapters */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <BookOpen className="mr-3 h-5 w-5 text-blue-400" />
            Course Curriculum
          </h2>
          
          <div className="space-y-3">
            {course?.courseOutput?.chapters?.map((chapter, index) => (
              <Link key={index} href={`/course/${course?.courseId}/start`}>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ x: 5, backgroundColor: "#111111" }}
                  className="group cursor-pointer"
                >
                  <div className="border border-gray-800 hover:border-white rounded-lg p-4 transition-all duration-200">
                    <div className="flex items-center gap-4">
                      {/* Chapter Number */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full border border-gray-800 group-hover:border-pink-500 flex items-center justify-center text-lg font-medium text-gray-500 group-hover:text-white transition-all duration-200">
                          {index + 1}
                        </div>
                      </div>
                      
                      {/* Chapter Content */}
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium group-hover:text-blue-300 transition-colors duration-300">
                          {chapter?.chapterName.replace(/^Chapter \d+:/, "").trim()}
                        </h3>
                        
                        <p className="text-gray-500 mt-1 line-clamp-2">{chapter?.about}</p>
                      </div>
                      
                      {/* Chapter Play Button */}
                      <div className="flex-shrink-0">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="w-8 h-8 rounded-full bg-gray-800 group-hover:bg-white flex items-center justify-center"
                        >
                          <Play className="w-4 h-4 text-gray-400 group-hover:text-black transition-all duration-200" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Quick Navigation Floating Button for Mobile */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="fixed bottom-6 right-6 md:hidden z-40"
        >
          <Link href={`/course/${course?.courseId}/start`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 rounded-full bg-white text-black shadow-lg flex items-center justify-center"
            >
              <Play className="h-6 w-6" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseLayout;