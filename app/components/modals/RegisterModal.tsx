"use client"

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import { useCallback, useState } from "react"
import {FieldValues,SubmitHandler, useForm} from "react-hook-form"
import useRegisterModalStore from "@/app/hooks/useRegisterModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast"
import Button from "../Button"
import { signIn } from "next-auth/react"
import useLoginModalStore from "@/app/hooks/useLoginModal"

export default function RegisterModal(){
    const registerModal = useRegisterModalStore()
    const loginModal = useLoginModalStore()
    const [isLoading,setIsLoading] = useState(false)
    const toggle = useCallback(()=>{
        registerModal.onClose()
        loginModal.onOpen()
    },[loginModal,registerModal])

    const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:'',
        }
    })

    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)
        
        axios.post('/api/register',data).then(()=>{
            registerModal.onClose()
        }).catch((error)=>{
            toast.error("Something went wrong")
        }).finally(()=>{
            setIsLoading(false)
        })
    
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title={"Welcome to Airbnb"} subtitle={"Create an account!"}/>
            <Input register={register} id="email" disabled={isLoading} errors={errors} label={"Email"} required/>
            <Input register={register} id="name" disabled={isLoading} errors={errors} label={"Name"} required/>
            <Input register={register} id="password" type="password" disabled={isLoading} errors={errors} label={"Password"}required/>
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3 ">
            <hr />
            <Button outline label="Continue with Google" icon={FcGoogle} onClick={()=>signIn('google')}/>
            <Button outline label="Continue with Github" icon={AiFillGithub} onClick={()=>signIn('github')}/>
            <div className="text-neutral-500 text-center font-light mt-4">
                <div className="flex items-center gap-2 justify-center">
                    <div>Already have an account ?</div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>Login </div>
                </div>
            </div>
        </div>
    )

    return (
       <Modal
        disabled={isLoading} isOpen={registerModal.isOpen} title="Register" actionLabel="Continue" onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent}
       />
    )
}