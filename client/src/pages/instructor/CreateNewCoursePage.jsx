import CourseCariculum from '@/components/instructor-views/create-new-course/CourseCariculum'
import CourseLandingPage from '@/components/instructor-views/create-new-course/CourseLandingPage'
import CourseSettings from '@/components/instructor-views/create-new-course/CourseSettings'
import ProgressBar from '@/components/progress-bar/ProgressBar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from '@/config/config'
import { selectCourseCuriculumForm, selectCourseLandingForm, selectInstructorLoading, selectInstructorUploadedMediaDetails } from '@/store/instructor/instructor.selector'
import { createNewCourseStart, deleteLectureStart, deleteMediaStart, setCourseCuriculumForm, setCourseLandingForm, uploadMediaStart } from '@/store/instructor/instructorSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateNewCoursePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const loading = useSelector(selectInstructorLoading)
    const courseCuriculumForm = useSelector(selectCourseCuriculumForm)
    const courseLandingForm = useSelector(selectCourseLandingForm)
    const uploadedMediaDetails = useSelector(selectInstructorUploadedMediaDetails);


    const [courseLandingFormInput, setCourseLandingFormInput] = useState(courseLandingInitialFormData);
    const [courseCuriculumFormInput, setCourseCuriculumFormInput] = useState(courseCurriculumInitialFormData);

    useEffect(() => {
        const index = uploadedMediaDetails?.type
        if (index !== "" && index !== "image") {
            let copy = [...courseCuriculumFormInput]
            copy[index] = {
                ...copy[index],
                video: uploadedMediaDetails.secure_url,
                videoPublicId: uploadedMediaDetails.public_id,
                lectureIndex: index,
            }
            updateRedux(copy)
        }
    }, [uploadedMediaDetails])

    const updateRedux = (copy) => {
        setCourseCuriculumFormInput(copy)
        dispatch(setCourseCuriculumForm(copy))
    }

    useEffect(() => {
        if (courseCuriculumForm) {
            console.log("on redux state change", courseCuriculumForm);

            setCourseCuriculumFormInput(courseCuriculumForm)
            localStorage.setItem('courseCuriculumForm', JSON.stringify(courseCuriculumForm))
        }
    }, [courseCuriculumForm])

    useEffect(() => {
        if (courseLandingForm) {
            console.log("on redux state change", courseLandingForm);
            setCourseLandingFormInput(courseLandingForm)
            localStorage.setItem('courseLandingForm', JSON.stringify(courseLandingForm))
        }
    }, [courseLandingForm])

    useEffect(() => {
        const savedLandingForm = localStorage.getItem('courseLandingForm')
        const savedCuriculumForm = localStorage.getItem('courseCuriculumForm')
        if (savedLandingForm) {
            console.log("after reload", savedLandingForm)
            setCourseLandingFormInput(JSON.parse(savedLandingForm))
        }
        if (savedCuriculumForm) {
            console.log("after reload", savedCuriculumForm)
            setCourseCuriculumFormInput(JSON.parse(savedCuriculumForm))
        }
    }, [])

    useEffect(() => {
        const handleBeforeUnload = () => {
            console.log("before unload", courseLandingFormInput);
            console.log("before unload", courseCuriculumFormInput);

            dispatch(setCourseLandingForm(courseLandingFormInput))
            dispatch(setCourseCuriculumForm(courseCuriculumFormInput))
            localStorage.setItem('courseLandingForm', JSON.stringify(courseLandingFormInput))
            localStorage.setItem('courseCuriculumForm', JSON.stringify(courseCuriculumFormInput))
        };

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        };
    }, [courseLandingFormInput, courseCuriculumFormInput])

    const handleCourseSubmit = () => {
        dispatch(setCourseLandingForm(courseLandingFormInput))
        dispatch(setCourseCuriculumForm(courseCuriculumFormInput))
        dispatch(createNewCourseStart(navigate))
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

    const handleDeleteLecture = (lectureIndex, videoPublicId) => {
        dispatch(setCourseCuriculumForm(courseCuriculumFormInput))
        dispatch(deleteLectureStart({ lectureIndex, videoPublicId }))
    }

    const handleDeleteVideo = (publicId) => {
        dispatch(setCourseCuriculumForm(courseCuriculumFormInput))
        dispatch(deleteMediaStart({ public_id: publicId, type: "video" }))
    }

    const handleLectureVideoChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            let mediaFormData = new FormData()
            mediaFormData.set("media", file)
            dispatch(uploadMediaStart({ formData: mediaFormData, type: index }))
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            dispatch(setCourseLandingForm(courseLandingFormInput))
            let mediaFormData = new FormData()
            mediaFormData.set("media", file)
            dispatch(uploadMediaStart({ formData: mediaFormData, type: "image" }))
        }
    }

    const handleDeleteImage = () => {
        dispatch(setCourseLandingForm(courseLandingFormInput))
        if (courseLandingFormInput.imagePublicId) {
            dispatch(deleteMediaStart({ public_id: courseLandingFormInput.imagePublicId, type: "image" }))
        }
    }
    return (
        <div className='container mx-auto p-4 '>
            <div className=' flex justify-between'>
                <h1 className='text-3xl font-extrabold mb-5'>Create New Course</h1>
                <Button disabled={loading} onClick={handleCourseSubmit} className="text-sm tracking-wider font-bold px-8">SUBMIT</Button>

            </div>
            {
                loading && <ProgressBar />
            }
            <Card >
                <CardContent>
                    <div className='container mx-auto p-4 '>
                        <Tabs defaultValue="curriculum" className="space-y-4">
                            <TabsList className="">
                                <TabsTrigger value="cariculum">Cariculum</TabsTrigger>
                                <TabsTrigger value="course-landing-page">Course Landing Page</TabsTrigger>
                                <TabsTrigger value="settings">Settings</TabsTrigger>
                            </TabsList>
                            <TabsContent value="cariculum">
                                <CourseCariculum
                                    courseCariculumFormData={courseCuriculumFormInput}
                                    handleDeleteLecture={handleDeleteLecture}
                                    handleDeleteVideo={handleDeleteVideo}
                                    handleLectureVideoChange={handleLectureVideoChange}
                                    handleNewLecture={handleNewLecture}
                                    handleFreePreviewChange={handleFreePreviewChange}
                                    handleLectureTitleChange={handleLectureTitleChange}
                                />
                            </TabsContent>
                            <TabsContent value="course-landing-page">
                                <CourseLandingPage courseLandingForm={courseLandingFormInput} setCourseLandingForm={setCourseLandingFormInput} />
                            </TabsContent >
                            <TabsContent value="settings">
                                <CourseSettings
                                    formInput={courseLandingFormInput}
                                    handleDeleteImage={handleDeleteImage}
                                    handleImageChange={handleImageChange}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateNewCoursePage