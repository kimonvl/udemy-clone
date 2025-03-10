import React from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

const FormControls = ({ formControls, formInput, setFormInput }) => {

  const renderComponentByType = (controlItem) => {

    const currentElementValue = formInput[controlItem.name];

    switch (controlItem.componentType) {
      case "input":
        return (
          <Input
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            value={currentElementValue}
            onChange={(e) => setFormInput({...formInput, [controlItem.name] : e.target.value})}
          />
        )
      case "select":
        return (
          <Select 
            onValueChange={(value) => setFormInput({...formInput, [controlItem.name]: value})}
            value={currentElementValue}
            >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options && controlItem.options.length > 0
                ? controlItem.options.map((optionItem) => (
                  <SelectItem key={optionItem.id} value={optionItem.id}>
                    {optionItem.label}
                  </SelectItem>
                ))
                : null}
            </SelectContent>
          </Select>
        )
      case "textarea":
        return (
          <Textarea
          id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            value={currentElementValue}
            onChange={(e) => setFormInput({...formInput, [controlItem.name] : e.target.value})}
          />
        )

      default:
        return (
          <Input
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            value={currentElementValue}
            onChange={(e) => setFormInput({...formInput, [controlItem.name] : e.target.value})}
          />
        )
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      {
        formControls.map((controlItem) => {
          return (
            <div key={controlItem.name}>
              <Label className="float-start mb-1" htmlFor={controlItem.name}>{controlItem.label}</Label>
              {renderComponentByType(controlItem)}
            </div>
          )
        })
      }
    </div>
  )
}

export default FormControls;