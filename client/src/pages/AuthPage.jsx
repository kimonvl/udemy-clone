import CommonForm from '@/components/common-form/CommonForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { signInFormControls, signUpFormControls } from '@/config/config'
import { loginStart, signUpStart } from '@/store/auth/authSlice'
import { GraduationCap } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const AuthPage = () => {
    const dispatch = useDispatch();

    const [signUpInput, setSignUpInput] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [signInInput, setSignInInput] = useState({
        email: "",
        password: "",
    });

    const validateSignIn = () =>{
        return (signInInput && signInInput.email && signInInput.password);
    }

    const validateSignUp = () =>{
        return (signInInput && signUpInput.username && signUpInput.email && signUpInput.password);
    }

    const signUpSubmit = (e) => {
        e.preventDefault();
        //dispatch the action here
        console.log(signUpInput);
        dispatch(signUpStart({...signUpInput, role: "student"}));

    }

    const loginSubmit = (e) => {
        e.preventDefault();
        //dispatch the action here
        console.log(signInInput);
        dispatch(loginStart(signInInput));
    }

    return (
        <div className='flex flex-col min-h-screen'>
            <header className='px-4 lg:px-6 h-14 flex items-center border-b'>
                <Link to={"/"} className='flex items-center justify-center'>
                    <GraduationCap className='h-8 w-8 mr-4' />
                    <span className='font-extrabold text-xl'>LMS LEARN</span>
                </Link>
            </header>
            <div className='flex items-center justify-center min-h-screen bg-background'>
                <Tabs defaultValue="signin" className='w-full max-w-md'>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                        <Card className="p-6 space-y-4">
                            <CardHeader>
                                <CardTitle>Sign in to your account</CardTitle>
                                <CardDescription>Enter your email and password to sign in</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <CommonForm formControls={signInFormControls} formInput={signInInput} setFormInput={setSignInInput} onFormSubmit={loginSubmit} buttonText={"Sign In"} isButtonDisabled={!validateSignIn()}/>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="signup">
                        <Card className="p-6 space-y-4">
                            <CardHeader>
                                <CardTitle>Sign up to create a new account</CardTitle>
                                <CardDescription>Enter your details to sign up</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <CommonForm formControls={signUpFormControls} formInput={signUpInput} setFormInput={setSignUpInput} onFormSubmit={signUpSubmit} buttonText={"Sign Up"} isButtonDisabled={!validateSignUp()}/>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default AuthPage