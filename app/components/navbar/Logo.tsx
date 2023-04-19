"use client"

import Image from "next/image"
import {useRouter} from "next/navigation"

export default function Logo() {
    const router = useRouter()

    return (
      <div className = "flex items-center justify-center gap-4">
              <Image alt={"logo"} className="hidden md:block cursor-pointer" src={"/images/airplane.jpg"} width={100} height={100} onClick={() => router.push("/")} />
              <div className="font-bold text-2xl">MyVacay</div>
      </div>
    )

}