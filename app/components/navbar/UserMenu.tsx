"use client"

import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar'
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem'
import RegisterModal from '../modals/RegisterModal';
import useRegisterModalStore from '@/app/hooks/useRegisterModal'
import useLoginModalStore from '@/app/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import useRentModalStore from '@/app/hooks/useRentModal'

interface UserMenuProps{
  currentUser?: SafeUser | null;
}


export default function  UserMenu({currentUser}:UserMenuProps) {
    const[isOpen,setIsOpen] = useState(false)
    const registerModal = useRegisterModalStore()
    const loginModal = useLoginModalStore()
    const rentModal = useRentModalStore()
    
    const toggleOpen = useCallback(()=>{
        setIsOpen(!isOpen)
    
    },[isOpen])

    const onRent = useCallback(()=>{
      if(!currentUser){
        return loginModal.onOpen()
        
      }
      //Open rent Modal

      rentModal.onOpen()
    },[currentUser,loginModal,rentModal])

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
            Lease your home
        </div>
        <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
            <AiOutlineMenu/>
            <div className="hidden md:block">
                <Avatar src={currentUser?.image}/>
            </div>
        </div>
      </div>
      {isOpen &&(
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              {currentUser ? (  <>
                    <MenuItem onClick={()=>{}} label={"My trips"}/>
                    <MenuItem onClick={()=>{}} label={"My favorites"}/>
                    <MenuItem onClick={()=>{}} label={"My reservations"}/>
                    <MenuItem onClick={()=>{}} label={"My properties"}/>
                    <MenuItem onClick={rentModal.onOpen} label={"Lease my home"}/>
                    <MenuItem onClick={()=>signOut()} label={"Logout"}/>

                </>) :  ( <>
                    <MenuItem onClick={loginModal.onOpen} label={"Login"}/>
                    <MenuItem onClick={registerModal.onOpen} label={"Sign Up"}/>

                </>)}
              
            </div>
        </div>
      )}
    </div>
  )
}