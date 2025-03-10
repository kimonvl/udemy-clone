import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import VideoPlayer from '@/components/video-player/VideoPlayer'
import React from 'react'

const CourseCariculum = ({
  courseCariculumFormData,
  handleDeleteLecture,
  handleDeleteVideo,
  handleLectureVideoChange,
  handleNewLecture,
  handleLectureTitleChange,
  handleFreePreviewChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture}>Add New Lecture</Button>
        {/**progress bar */}
        <div className='mt-4 space-y-4'>
          {
            courseCariculumFormData.map((item, index) => {
              return (
                <div key={index} className='border p-5 rounded-md'>
                  <div className='flex gap-5 items-center'>
                    <h3 className='font-semibold'>Lecture {index}</h3>
                    <Input
                      name={`title-${index}`}
                      placeholder="Enter lecture title"
                      className="max-w-96"
                      onChange={(e) => handleLectureTitleChange(e.target.value, index)}
                      value={courseCariculumFormData[index]?.title}
                    />
                    <div className='flex items-center space-x-2'>
                      <Switch
                        onCheckedChange={(value) => handleFreePreviewChange(value, index)}
                        checked={courseCariculumFormData[index]?.freePreview}
                        id={`freePreview-${index}`}
                      />
                      <Label htmlFor={`freePreview-${index}`}>Free Preview</Label>
                    </div>
                  </div>
                  <div className='mt-6'>
                    {
                      item.video ? (
                        <>
                          <div>
                            <VideoPlayer
                              url={item.video}
                              width="450px"
                              height="200px"
                            />
                          </div>
                          <div className='flex gap-3 mt-2 items-center'>
                            <Button onClick={() => handleDeleteVideo(item.videoPublicId)}>Delete Video</Button>

                          </div>
                        </>
                      ) :
                        (<Input
                          type="file"
                          accept="video/*"
                          onChange={(event) => handleLectureVideoChange(event, index)}
                          className="mb-4"
                        />)

                    }

                    {
                      item.lectureIndex !== "" ? (
                        <Button onClick={() => handleDeleteLecture(item.lectureIndex, item.videoPublicId)}>Delete Lecture</Button>
                      ) : null
                    }
                  </div>
                </div>
              )

            })
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCariculum