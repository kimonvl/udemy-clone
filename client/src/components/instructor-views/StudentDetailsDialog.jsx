import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'

const StudentDetailsDialog = ({openDialog, setOpenDialog, student}) => {
  return (
    <Dialog open={openDialog}>
            <DialogContent
                onInteractOutside={() => {setOpenDialog(false)}}
                className="w-[600px] h-[500px] p-0 flex flex-col "
            >
                <div className='grid'>
                    <span>Name:</span>
                    <span>{student?.username}</span>
                </div>
                <div className='grid'>
                    <span>Email:</span>
                    <span>{student?.email}</span>
                </div>
                <div className='grid'>
                    <span>Courses:</span>
                    <span>
                        {
                            student?.courses.map((course) => `${course.title}, `)
                        }
                    </span>
                </div>
            </DialogContent>
        </Dialog>
  )
}

export default StudentDetailsDialog