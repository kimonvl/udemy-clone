import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import VideoPlayer from '@/components/video-player/VideoPlayer'
import { selectStudentLoading } from '@/store/student/student.selector'
import { CheckCircle, Globe, Lock, PlayCircle } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const StudentCourseDetailsPage = () => {
  const loading = useSelector(selectStudentLoading)

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </div>
    )
  }
  return (
    <div className='mx-auto p-4'>
      <div className='bg-gray-900 text-white p-8 rounded-t-lg'>
        <h1 className='text-3xl font-bold mb-4'>Course Title</h1>
        <p className='text-xl mb-4'>Course Subtitle</p>
        <div className='flex items-center space-x-4 mt-2 text-sm'>
          <span>Created By Instructor Name</span>
          <span>Created On Date</span>
          <span className='flex items-center'>
            <Globe className='mr-1 h-4 w-4'/>
            Primary Language
          </span>
          <span>15 students</span>
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-8 mt-8'>
        <main className='flex-grow'>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What you'l leard</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                {
                  "objective1,objective2,objective3".split(",").map((objective, index) => (
                    <li key={index} className='flex items-start'>
                      <CheckCircle className='mr-2 h-5 w-5 text-green-500 flex-shrink-0'/>
                      <span>{objective}</span>
                    </li>
                  ))
                }
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-8">
  <CardHeader>
    <CardTitle>Course Curriculum</CardTitle>
  </CardHeader>
  <CardContent>
    <ul className="list-none space-y-2"> {/* Add space-y-2 to control spacing */}
      {[1, 2, 3, 4, 5].map((lecture, index) => (
        <li 
          key={index} 
          className={`${
            true ? "cursor-pointer" : "cursor-not-allowed"
          } flex flex-col items-start`} // Use items-start instead of left
          onClick={() => null}
        >
          <div className="flex items-center">
            {true ? (
              <PlayCircle className="mr-2 h-4 w-4" />
            ) : (
              <Lock className="mr-2 h-4 w-4" />
            )}
            <span>Lecture Title</span>
          </div>
          <div className="aspect-video rounded-lg flex">
            <VideoPlayer width="450px" height="200px" url={""} />
          </div>
        </li>
      ))}
    </ul>
  </CardContent>
</Card>

          <div className='mb-4'>
            <span className='text-3xl font-bold'>Price: 14$</span>
          </div>
          <Button className="w-full">Buy Now</Button>
        </main>
      </div>
    </div>
  )
}

export default StudentCourseDetailsPage