"use client"

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import { useCallback, useState } from "react"
import {FieldValues,SubmitHandler, useForm} from "react-hook-form"
import useLoginModalStore from "@/app/hooks/useLoginModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast"
import Button from "../Button"
import useRegisterModalStore from "@/app/hooks/useRegisterModal"
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation"



export default function LoginModal(){
    const loginModal = useLoginModalStore()
    const router = useRouter()
    const registerModal = useRegisterModalStore()
    const [isLoading,setIsLoading] = useState(false)

    const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
          
            email:'',
            password:'',
        }
    })

    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)
        
        signIn('credentials',{
            ...data,
            redirect: false,
        }).then((callback)=> {
            setIsLoading(false)
         if(callback?.ok){
            toast.success("Login Successful")
            router.refresh()
            loginModal.onClose()
         
         }

         if(callback?.error){
            toast.error(callback.error)
         }
    })
 
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title={"Welcome Back!"} subtitle={"Login to your MyVacay Account"}/>
            <Input register={register} id="email" disabled={isLoading} errors={errors} label={"Email"} required/>
            <Input register={register} id="password" type="password" disabled={isLoading} errors={errors} label={"Password"}required/>
        </div>
    )

    const toggle = useCallback(()=>{
        loginModal.onClose()
        registerModal.onOpen()

    },[loginModal,registerModal])

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3 ">
            <hr />
            <Button outline label="Continue with Google" icon={FcGoogle} onClick={()=>signIn("google")}/>
            <Button outline label="Continue with Github" icon={AiFillGithub} onClick={()=>signIn("github")}/>
            <div className="text-neutral-500 text-center font-light mt-4">
                <div className="flex items-center gap-2 justify-center">
                    <div>First time using MyVacay ?</div>
                    <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline" >Create an account </div>
                </div>
            </div>
        </div>
    )

    return (
       <Modal
        disabled={isLoading} isOpen={loginModal.isOpen} title="Login" actionLabel="Continue" onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent}
       />
    )
}