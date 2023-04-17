"use client"

import Image from "next/image"


export default function Avatar(){
    return(
        <Image className="rounded-full" src="/images/placeholder.jpg" width={30} height={30} alt="avatar" />
    )
}