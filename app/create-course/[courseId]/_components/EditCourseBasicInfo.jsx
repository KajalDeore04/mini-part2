import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

const EditCourseBasicInfo = ({ course,refreshData }) => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    setName(course.courseOutput?.courseName);
    setDescription(course.courseOutput?.description);
  }, [course]);

  const onUpdateHandler = async () => {
    course.courseOutput.courseName = name;
    course.courseOutput.description = description;

    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList.id });

      refreshData(true)
      //   window.location.reload(); 

  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
          
            <div className="mt-3">
              <label>Course Title</label>
              <Input
                defaultValue={`${course?.courseOutput?.courseName}`}
                className="text-black"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Course Description</label>
              <Textarea
                defaultValue={`${course?.courseOutput?.description}`}
                className="text-black h-40"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onUpdateHandler}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseBasicInfo;
