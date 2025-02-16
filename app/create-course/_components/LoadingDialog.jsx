import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const LoadingDialog = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {/* Add AlertDialogTitle for accessibility */}
          <AlertDialogTitle>
            <VisuallyHidden>Loading Course</VisuallyHidden>
          </AlertDialogTitle>
            <div className="flex flex-col items-center py-10">
              <Image src={'/loader.gif'} width={100} height={100} alt="loader" /> 
              <h2>
                Please wait... AI is working on your course
              </h2>
            </div>
          <AlertDialogDescription>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingDialog;
