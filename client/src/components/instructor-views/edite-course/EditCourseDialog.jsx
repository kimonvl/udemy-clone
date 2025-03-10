import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import CourseCariculum from '../create-new-course/CourseCariculum'
import CourseLandingPage from '../create-new-course/CourseLandingPage'
import CourseSettings from '../create-new-course/CourseSettings'
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from '@/config/config'
import { useDispatch, useSelector } from 'react-redux'
import { selectInstructorSelectedCourse } from '@/store/instructor/instructor.selector'
import { deleteImageFromEditStart, deleteLectureFromEdit, deleteTemporaryUploadedImageStart, deleteTemprorarilyUploadedVideosStart, editCourseStart, setInstructorSelectedCourse, temporaryDeleteVideoFromEdit, uploadImageFromEditStart, uploadVideoFromEditStart } from '@/store/instructor/instructorSlice'

const EditCourseDialog = ({ openDialog, setOpenDialog }) => {
    const selectedCourse = useSelector(selectInstructorSelectedCourse)
    const dispatch = useDispatch()

    const [courseCuriculumFormInput, setCourseCuriculumFormInput] = useState(courseCurriculumInitialFormData)
    const [courseLandingFormInput, setCourseLandingFormInput] = useState(courseLandingInitialFormData)

    useEffect(() => {
        if (selectedCourse) {
            const { lectures, ...courseDetails } = selectedCourse; // Exclude `lectures`

            setCourseLandingFormInput(courseDetails)
            setCourseCuriculumFormInput(lectures || [])
        }
    }, [selectedCourse])

    const handleSubmit = () => {
        console.log("Submitting Course Data...", { courseCuriculumFormInput, courseLandingFormInput });
        dispatch(setInstructorSelectedCourse({
            ...courseLandingFormInput,
            lectures: courseCuriculumFormInput,
        }))
        //delete temporarily deleted videos & delete initial image if changed
        dispatch(editCourseStart(setOpenDialog))
    };

    const handleCancel = () => {
        //delete temporarily uploaded videos
        dispatch(deleteTemprorarilyUploadedVideosStart())
        //delete temporarily uploaded image
        dispatch(deleteTemporaryUploadedImageStart())
        setOpenDialog(false);
    };

    const handleDeleteVideo = (publicId) => {
        dispatch(setInstructorSelectedCourse({
            ...courseLandingFormInput,
            lectures: courseCuriculumFormInput,
        }))
        dispatch(temporaryDeleteVideoFromEdit({ public_id: publicId }))
    }

    const handleDeleteLecture = (lectureIndex, videoPublicId) => {
        dispatch(setInstructorSelectedCourse({
            ...courseLandingFormInput,
            lectures: courseCuriculumFormInput,
        }))
        dispatch(deleteLectureFromEdit({ lectureIndex, videoPublicId }))
    }

    const handleLectureVideoChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            let mediaFormData = new FormData()
            mediaFormData.set("media", file)
            //add index when adding video before adding tittle or free preview
            let copy = [...courseCuriculumFormInput];
            copy[index] = { ...copy[index], lectureIndex: index };
            setCourseCuriculumFormInput(copy);

            dispatch(setInstructorSelectedCourse({
                ...courseLandingFormInput,
                lectures: copy,
            }))
            dispatch(uploadVideoFromEditStart({ formData: mediaFormData, index: index }))
        }
    }

    const handleNewLecture = () => {
        setCourseCuriculumFormInput([...courseCuriculumFormInput, courseCurriculumInitialFormData[0]])
    }

    const handleLectureTitleChange = (title, index) => {
        let copy = [...courseCuriculumFormInput];
        copy[index] = { ...copy[index], title: title, lectureIndex: index };
        console.log(copy);
        setCourseCuriculumFormInput(copy);
    }

    const handleFreePreviewChange = (value, index) => {
        let copy = [...courseCuriculumFormInput];
        copy[index] = { ...copy[index], freePreview: value, lectureIndex: index };
        console.log(copy);
        setCourseCuriculumFormInput(copy);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            let mediaFormData = new FormData()
            mediaFormData.set("media", file)
            //
            dispatch(uploadImageFromEditStart({formData: mediaFormData}))
        }
    }

    const handleDeleteImage = () => {
        //
        dispatch(setInstructorSelectedCourse({
            ...courseLandingFormInput,
            lectures: courseCuriculumFormInput,
        }))
        if (courseLandingFormInput.imagePublicId) {
            dispatch(deleteImageFromEditStart(courseLandingFormInput.imagePublicId))
        }
    }
    return (
        <Dialog open={openDialog}>
            <DialogContent
                onInteractOutside={() => {setOpenDialog(false);handleCancel()}}
                className="w-[600px] h-[500px] p-0 flex flex-col "
            >
                {/* ✅ Fixed Title & Submit Button */}
                <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                    <DialogTitle className="text-lg font-semibold">Edit Course</DialogTitle>
                    <div className="flex items-center gap-2">
                        <Button onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>

                {/* ✅ Tabs with Fixed Position */}
                <Tabs defaultValue="curriculum" className="flex flex-col h-full min-h-0">
                    <div className="px-4 py-2 border-b bg-white sticky top-[56px] z-10">
                        <TabsList className="flex">
                            <TabsTrigger value="curriculum">Cariculum</TabsTrigger>
                            <TabsTrigger value="course-landing-page">Course Landing Page</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>
                    </div>


                    <div className="flex-grow overflow-y-hidden px-4 py-2 min-h-0">
                        <TabsContent value="curriculum" className="h-full">
                            <div className="max-h-full overflow-y-auto">
                                {/**test lecture video change*/}
                                <CourseCariculum
                                    courseCariculumFormData={courseCuriculumFormInput}
                                    handleDeleteVideo={handleDeleteVideo}
                                    handleDeleteLecture={handleDeleteLecture}
                                    handleLectureVideoChange={handleLectureVideoChange}
                                    handleNewLecture={handleNewLecture}
                                    handleLectureTitleChange={handleLectureTitleChange}
                                    handleFreePreviewChange={handleFreePreviewChange}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="course-landing-page" className="h-full">
                            <div className="max-h-full overflow-y-auto">
                                <CourseLandingPage
                                    courseLandingForm={courseLandingFormInput}
                                    setCourseLandingForm={setCourseLandingFormInput}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="settings" className="h-full">
                            <div className="max-h-full overflow-y-auto">
                                <CourseSettings
                                    formInput={courseLandingFormInput}
                                    handleDeleteImage={handleDeleteImage}
                                    handleImageChange={handleImageChange}
                                />
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

export default EditCourseDialog
