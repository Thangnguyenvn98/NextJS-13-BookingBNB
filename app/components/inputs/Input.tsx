"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps{
    id:string;
    label:string;
    type?:string;
    disabled?:boolean;
    formatPrice?:boolean;
    required?:boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors
}

export default function Input(){
    return(
        <input type="text" />
    )

}