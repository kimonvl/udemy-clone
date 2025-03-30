import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import VideoPlayer from '@/components/video-player/VideoPlayer'
import { selectStudentSelectedCourseProgress } from '@/store/student/student.selector'
import { fetchCourseProgressStart } from '@/store/student/studentSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

//implement the marked as watched feature

const StudentCourseProgressPage = () => {
  const dispatch = useDispatch()
  const {courseId} = useParams()
  const selectedCourse = useSelector(selectStudentSelectedCourseProgress)

  const [selectedVideo, setSelectedVideo] = useState("")

  console.log("course", selectedCourse)
  useEffect(() => {
    // fetch the course progress
    dispatch(fetchCourseProgressStart(courseId))
  }, [courseId])

  return (
    <div className='flex h-screen'>
      {/* Left Section (1/3) */}
      <div className="w-1/5 flex flex-col bg-blue-500 flex items-center justify-center text-white text-xl p-4">
        <h1>{selectedCourse?.title}</h1>
        <Card className="w-full h-full">
          <CardContent className="p-4 items-center">
            {
              selectedCourse?.lectures.length > 0 && selectedCourse?.lectures.map((lecture) => (
                <div className='m-2 flex flex-row gap-2 items-center p-2 w-full'>
                  <Button onClick={() =>setSelectedVideo(lecture.video)} className="w-full">{lecture.title}</Button>
                  {
                    lecture.index < selectedCourse.progressIndex ? <span>watched</span> : null
                  }
                  
                </div>
              ))
            }
          </CardContent>
        </Card>

      </div>

      <div className="w-4/5 bg-green-500 flex items-center justify-center text-white text-xl p-4">
        <div className="w-full h-full flex justify-center items-center">
          {/* Video Player takes most of the space */}
          <VideoPlayer width="90%" height="80%" url={selectedVideo} />
        </div>
      </div>
    </div>
  )
}

export default StudentCourseProgressPage