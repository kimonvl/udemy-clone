import InstructorCourses from '@/components/instructor-views/instructorCourses'
import InstuctorDashboard from '@/components/instructor-views/InstuctorDashboard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from '@/config/config'
import { logoutStart } from '@/store/auth/authSlice'
import { BarChart, Book, LogOut } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const InstructorDashboardPage = () => {
  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState("dashboard")

  const handleLogout = () => {
    console.log("logging out")
    dispatch(logoutStart());
    localStorage.setItem("courseCuriculumForm", JSON.stringify(courseCurriculumInitialFormData));
    localStorage.setItem("courseLandingForm", JSON.stringify(courseLandingInitialFormData));
  }

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstuctorDashboard />
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses />
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null
    },
  ]
  console.log(activeTab);

  return (
    <div className='flex h-full min-h-screen bg-gray-100'>
      <aside className='w-64 bg-white shadow-md hidden md:block'>
        <div className='p-4'>
          <h2 className='text-2xl font-bold mb-4'>Instructor View</h2>
          <nav >
            {
              menuItems.map((menuItem) => (
                <Button
                  className="w-full justify-start mb-2"
                  variant={activeTab === menuItem.value ? "" : "ghost"}
                  onClick={
                    menuItem.value === "logout" ?
                      handleLogout : () => setActiveTab(menuItem.value)
                  }>
                  <menuItem.icon className='mr-2 h-4 w-4' />
                  {menuItem.label}
                </Button>
              ))
            }
          </nav>
        </div>
      </aside>
      <main className='flex-1 p-8 overflow-y-auto'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-3xl font-bold mb-8'>Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {
              menuItems.map((menuItem) => (
                <TabsContent value={menuItem.value}>
                  {menuItem.component !== null ? menuItem.component : null}
                </TabsContent>
              ))
            }
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default InstructorDashboardPage