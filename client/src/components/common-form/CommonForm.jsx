import React from 'react'
import { Button } from '../ui/button'
import FormControls from './FormControls'

const CommonForm = ({formControls, formInput, setFormInput, onFormSubmit, buttonText, isButtonDisabled = false}) => {
  return (
    <form onSubmit={onFormSubmit}>
        <FormControls formControls={formControls} formInput={formInput} setFormInput={setFormInput}/>
        <Button disabled={isButtonDisabled} type="submit" className="mt-5 w-full">{buttonText}</Button>
    </form>
  )
}

export default CommonForm