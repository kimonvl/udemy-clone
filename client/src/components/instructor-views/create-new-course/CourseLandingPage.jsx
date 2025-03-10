import FormControls from '@/components/common-form/FormControls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { courseLandingFormControls } from '@/config/config'
import React from 'react'

const CourseLandingPage = ({courseLandingForm, setCourseLandingForm}) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Landing Page</CardTitle>
      </CardHeader>
      <CardContent>
        <FormControls
          formControls={courseLandingFormControls}
          formInput={courseLandingForm}
          setFormInput={setCourseLandingForm}
        />
      </CardContent>
    </Card>
  )
}

export default CourseLandingPage