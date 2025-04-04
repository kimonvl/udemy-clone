import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VideoPlayer from '@/components/video-player/VideoPlayer'
import { selectStudentHaveCourseAccess, selectStudentLoading, selectStudentSelectedCourseProgress } from '@/store/student/student.selector'
import { fetchCourseProgressStart, updateCourseProgressStart } from '@/store/student/studentSlice'
import { Check, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const StudentCourseProgressPage = () => {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const selectedCourse = useSelector(selectStudentSelectedCourseProgress)
  const haveCourseAccess = useSelector(selectStudentHaveCourseAccess)
  const loading = useSelector(selectStudentLoading)

  const [selectedLecture, setSelectedLecture] = useState(null)
  const [progressIndex, setProgressIndex] = useState(selectedCourse?.progressIndex || [])
  const [courseFinished, setCourseFinished] = useState(false)

  useEffect(() => {
    dispatch(fetchCourseProgressStart(courseId))
  }, [courseId])

  useEffect(() => {
    setProgressIndex(selectedCourse?.progressIndex || [])
  }, [selectedCourse])

  const latestProgressRef = useRef(progressIndex)

  useEffect(() => {
    latestProgressRef.current = progressIndex
  }, [progressIndex])

  // 2. Handle beforeunload AND unmount just once
  useEffect(() => {
    const sendProgressUpdate = () => {
      if (latestProgressRef.current.length > 0) {
        dispatch(updateCourseProgressStart({ courseId, indexes: latestProgressRef.current }))
      }
    }

    window.addEventListener('beforeunload', sendProgressUpdate)

    return () => {
      window.removeEventListener('beforeunload', sendProgressUpdate)
      sendProgressUpdate() // Only on unmount, not on progress change
    }
  }, [courseId, dispatch])

  const handleVideoWatched = (index) => {
    setProgressIndex((prevProgress) => {
      if (prevProgress.includes(index)) return prevProgress; // No duplicates
      return [...prevProgress, index]; // Add new index
    });
    console.log("index", index);
    console.log("selectedCourse?.lectures?.length", selectedCourse?.lectures?.length);
    console.log("progressIndex?.length", progressIndex?.length);
    if(index + 1 == selectedCourse?.lectures?.length && progressIndex?.length + 1 == selectedCourse?.lectures?.length){
      setCourseFinished(true)
      console.log("courseFinished true");
      
    }

    const nextLecture = selectedCourse?.lectures?.find((lecture) => lecture.lectureIndex - 1 == index)
    if(nextLecture){
      setSelectedLecture(nextLecture)
    }
  }
  if (loading) return <Skeleton />

  return (
    <div className='flex flex-col h-screen bg-[#1c1d1f] text-white'>
      <div className='flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700'>
        <div className='flex items-center space-x-4'>
          <Button className="text-black" variant="ghost" size="sm">
            <ChevronLeft className='h-4 w-4 mr-2' />
            Back to My Courses Page
          </Button>
          <h1 className='text-lg font-bold hidden md:block'>
            {selectedCourse?.title}
          </h1>
        </div>
        <Button>
          <ChevronRight className='h-5 w-5' />
          <ChevronLeft className='h-5 w-5' />
        </Button>
      </div>
      <div className='flex flex-1 overflow-hidden'>
        <div className={`flex-1 ${false ? "mr-[400px]" : ""} transition-all duration-300`}>
          <VideoPlayer width='100%' height='500px' url={selectedLecture?.video} handleOnEnded={() => handleVideoWatched(selectedLecture?.lectureIndex)} />
          <div className='p-6 bg-[#1c1d1f]'>
            <h2 className='text-2xl font-bold mb-2'>{ }</h2>
          </div>
        </div>
        <div className={` w-[400px] bg-[#1c1d1f] border-l border-gray-700 transition-all duration-300 ${true ? "translate-x-0" : "translate-x-full"}`}>
          <Tabs defaultValue='content' className='h-full flex flex-col'>
            <TabsList className="grid bg-[#1c1d1f] w-full grid-cols-2 p-0 h-14">
              <TabsTrigger value="content" className="text-black rounded-none h-full">
                Course Content
              </TabsTrigger>
              <TabsTrigger value="overview" className="text-black rounded-none h-full">
                Overview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className='p-4 space-y-4'>
                  {
                    selectedCourse?.lectures.length > 0 && selectedCourse?.lectures.map((lecture) => (
                      <div onClick={() => setSelectedLecture(lecture)} className='flex items-center space-x-2 text-sm text-white font-bold cursor-pointer'>
                        {

                          progressIndex?.includes(lecture.lectureIndex) ? (<Check className='h-4 w-4 text-green-500' />) : (
                            <Play className='h-4 w-4' />
                          )
                        }
                        <span>{lecture?.title}</span>
                      </div>
                    ))
                  }
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className='p-4'>
                  <h2 className='text-xl font-bold mb-4'>About this course</h2>
                  <p className='text-gray-400'>{selectedCourse?.description}</p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Dialog open={!haveCourseAccess}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>You can't view this page</DialogTitle>
            <DialogDescription>Please purchase this course to get access</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={courseFinished}>
        <DialogContent showOverlay={courseFinished} className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription className="flex flex-col gap-3">
              <Label>You have completed the course</Label>
              <div className='flex flex-row gap-3'>
                <Button>My Courses Page</Button>
                <Button>Rewatch Course</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default StudentCourseProgressPage