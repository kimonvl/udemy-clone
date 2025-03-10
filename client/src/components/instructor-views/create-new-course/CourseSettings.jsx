import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useRef } from 'react'

const CourseSettings = ({
  formInput,
  handleImageChange,
  handleDeleteImage,
}) => {
  const inputrRef = useRef(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <div className='p-4'>
        {/**media progress bar here */}
      </div>
      <CardContent>
        {

          (
            formInput.image &&
            <img className="w-full max-w-md rounded-md shadow-md mb-4" src={formInput.image} />
          )
        }

        <div className='flex flex-col gap-3'>
          <Label>Upload Course Image</Label>
          <Input
            ref={inputrRef}
            className="hidden"
            onChange={handleImageChange}
            type="file"
            accept="image/*"
          />
          {
            formInput.image ? (
              <Button onClick={handleDeleteImage}>Delete Image</Button>
            ) : (

              <Button onClick={() => inputrRef.current.click()}>Choose Image</Button>
            )
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseSettings