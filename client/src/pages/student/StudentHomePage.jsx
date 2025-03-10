import { Button } from '@/components/ui/button'
import { courseCategories } from '@/config/config'
import vite from "../../../public/vite.svg"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectStudentFeaturedCourses, selectStudentLoading } from '@/store/student/student.selector'
import { fetchFeaturedCoursesStart } from '@/store/student/studentSlice'

const StudentHomePage = () => {
  const dispatch = useDispatch()
  const featuredCourses = useSelector(selectStudentFeaturedCourses)
  const loading = useSelector(selectStudentLoading)

  console.log("featuredCourses ", featuredCourses)

  useEffect(() => {
    dispatch(fetchFeaturedCoursesStart())
  }, [])
  return (
    <div className='min-h-screen bg-white'>
      <section className='flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8'>
        <div className='lg:w-1/2 lg:pr-12'>
          <h1 className='text-4xl font-bold mb-4'>Learning that gets you</h1>
          <p className='text-xl'>
            Skills for your present and your future. Get started with us
          </p>
        </div>
        <div className='lg:w-full mb-8 lg:mb-0'>
          <img src={vite}
            width={600}
            height={400}
            className='w-full h-auto rounded-lg shadow-lg'
          />
        </div>
      </section>
      <section className='py-8 px-4 lg:px-8 bg-gray-100'>
        <h2 className='text-2xl font-bold mb-6'>Course Categories</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {
            courseCategories.map((categoryItem) => (
              <Button
                className="justify-start"
                variant="outline"
                key={categoryItem.id}
              >
                {categoryItem.label}
              </Button>
            ))
          }
        </div>
      </section>
      <section className='py-12 px-4 lg:px-8'>
        <h2 className='text-2xl font-bold mb-6'>Featured Courses</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {
            loading ? (
              <div className="flex justify-center items-center col-span-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
              </div>
            ) : (
              featuredCourses && featuredCourses.length > 0 ? (
                featuredCourses.map((course) => (
                  <div key={course._id} onClick={() => null} className='border rounded-lg overflow-hidden shadow cursor-pointer'>
                    <img
                      src={course.image}
                      width={300}
                      height={150}
                      className='w-full h-40 object-fit'
                    />
                    <div className='p-4'>
                      <h3 className='font-bold mb-2'>{course.title}</h3>
                      <p className='text-sm text-gray-700 mb-2'>{course.instructorDetails[0].username}</p>
                      <p className='font-bold text-[16px]'>${course.pricing}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-4 text-center text-gray-500">
                  No courses found
                </div>
              )
            )
          }
        </div>

      </section>
    </div>
  )
}

export default StudentHomePage