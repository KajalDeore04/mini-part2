import { UserInputContext } from '@/app/_context/UserInputContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useContext, useState } from 'react';

const TopicDescription = () => {
    const {userCourseInput, setUserCourseInput} = useContext(UserInputContext);

    const handleInputChange = (fieldName, value) => {
        setUserCourseInput(prev => ({
            ...prev,
            [fieldName]: value
    }))
    }

    return (
        <div className='mx-20 lg:mx-44'>
            {/* Topic */}
            <div className='mt-5'>
                <label>Write the topic for which you want to generate a course (e.g., Python Course, Yoga, etc.): </label>
                <Input placeholder='Topic'
                defaultValue={userCourseInput?.topic}
                onChange={(e) => handleInputChange('topic', e.target.value)}
                 />
            </div>

            {/* TextArea desc */}
            <div className='mt-5 '>
                <label>Tell us more about the course, what you want to include in the course (Optional): </label>
                <Textarea placeholder='About your course' 
                defaultValue={userCourseInput?.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                />
            </div>
        </div>
    );
}

export default TopicDescription;
