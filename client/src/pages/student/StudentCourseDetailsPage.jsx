import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import VideoPlayer from '@/components/video-player/VideoPlayer'
import { createOrderStart } from '@/store/order/orderSlice'
import { selectStudentLoading, selectStudentSelectedCourse } from '@/store/student/student.selector'
import { CheckCircle, Globe, Lock, PlayCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const StudentCourseDetailsPage = () => {
  const dispatch = useDispatch()
  const loading = useSelector(selectStudentLoading)
  const selectedCourse = useSelector(selectStudentSelectedCourse)
  const [aprovalUrl, setAprovalUrl] = useState("")

  const handlePayment = () => {
    if(selectedCourse !== null){
      const paymentPayload = {
        orderStatus: "pending",
        paymentMethod: "paypal",
        paymentStatus: "initiated",
        orderDate: new Date(),
        paymentId: "",
        payerId: "",
        courseId: selectedCourse._id
      }
      dispatch(createOrderStart({paymentPayload, setAprovalUrl}))
    }
  }

  if(aprovalUrl != ""){
    window.location.href = aprovalUrl
  }

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
        <h1 className='text-3xl font-bold mb-4'>{selectedCourse?.title}</h1>
        <p className='text-xl mb-4'>{selectedCourse?.subtitle}</p>
        <div className='flex items-center space-x-4 mt-2 text-sm'>
          <span>{selectedCourse?.instructor?.username}</span>
          <span>Created On {selectedCourse?.createdAt}</span>
          <span className='flex items-center'>
            <Globe className='mr-1 h-4 w-4' />
            {selectedCourse?.primaryLanguage}
          </span>
          <span>{selectedCourse?.students?.length} students</span>
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
                  selectedCourse?.objectives.split(",").map((objective, index) => (
                    <li key={index} className='flex items-start'>
                      <CheckCircle className='mr-2 h-5 w-5 text-green-500 flex-shrink-0' />
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
                {selectedCourse?.lectures.map((lecture) => (
                  <li
                    key={lecture?._id}
                    className={`${lecture?.freePreview ? "cursor-pointer" : "cursor-not-allowed"
                      } flex flex-col items-start`} // Use items-start instead of left
                    onClick={() => null}
                  >
                    <div className="flex items-center">
                      {lecture?.freePreview ? (
                        <PlayCircle className="mr-2 h-4 w-4" />
                      ) : (
                        <Lock className="mr-2 h-4 w-4" />
                      )}
                      <span>{lecture?.title}</span>
                    </div>
                    {
                      lecture?.freePreview && (
                        <div className="aspect-video rounded-lg flex">
                          <VideoPlayer width="450px" height="200px" url={lecture?.video} />
                        </div>
                      )
                    }
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className='mb-4'>
            <span className='text-3xl font-bold'>Price: {selectedCourse?.pricing}$</span>
          </div>
          <Button onClick={() => handlePayment()} className="w-full">Buy Now</Button>
        </main>
      </div>
    </div>
  )
}

export default StudentCourseDetailsPage