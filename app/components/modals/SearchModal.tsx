"use client"

import useSearchModalStore from "@/app/hooks/useSearchModal"
import Modal from "./Modal"
import {useRouter, useSearchParams} from 'next/navigation'
import { useCallback, useMemo, useState } from "react"
import { Range } from "react-date-range"
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect"
import  qs  from 'query-string'
import {formatISO} from "date-fns"
import Heading from "../Heading"
import Calendar from "../inputs/Calendar"
import Counter from "../inputs/Counter"
import dynamic from "next/dynamic"

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}


export default function SearchModal (){
    const router = useRouter()
    const params = useSearchParams()
    const searchModal = useSearchModalStore()
    const[location,setLocation] = useState<CountrySelectValue>()
    const [step,setStep] = useState(STEPS.LOCATION)
    const [guestCount,setGuestCount] = useState(1)
    const [roomCount,setRoomCount] = useState(1)
    const [bathroomCount,setBathroomCount] = useState(1)
    const [dateRange,setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const Map = useMemo(()=>dynamic(()=>import('../Map'),{
        ssr:false,  //server side rendering disabled
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }),[location])


    const onBack = useCallback(()=>{
        setStep(step - 1)
    },[step])

    const onNext = useCallback(()=>{
        setStep(step + 1)
    },[step])

    const onSubmit = useCallback(async ()=>{
        if(step !== STEPS.INFO){
            return onNext()
        }
        let currentQuery = {}

        if(params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery:any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if(dateRange.startDate){
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }
        if(dateRange.endDate){
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url:'/',
            query: updatedQuery
        }, {skipNull: true})

        setStep(STEPS.LOCATION)
        searchModal.onClose()
        router.push(url)
    },[bathroomCount,guestCount,roomCount,dateRange,step,searchModal,location,onNext,params,router])


    const actionLabel = useMemo(()=>{
        if (step === STEPS.INFO){
            return 'Search'
        }
        else {
            return "Next"
        }
    },[step])

    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.LOCATION){
            return null
        }else {
            return "Back"
        }
    },[step])

    let bodyContent= (
        <div className="flex flex-col gap-8">
            <Heading title="Where do you wanna go ?" subtitle="Find the perfect location!"/>
            <CountrySelect value={location} onChange={(value)=> setLocation(value as CountrySelectValue)}/>
            <hr/>
            <Map center={location?.latlng}/>
        </div>
    )

    if(step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
            <Heading title="When do you plan to go ?" subtitle="Make sure everyone is free!"/>
            <Calendar value={dateRange} onChange={(value)=> setDateRange(value.selection)}/>
         
        </div>
        )
    }

    if(step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
            <Heading title="More information" subtitle="Find your perfect place!"/>
        <Counter title = "Guests" subtitle = "How many guests are coming?" value={guestCount} onChange={(value) => setGuestCount(value)}/>           
        <Counter title = "Rooms" subtitle = "How many rooms do you need?" value={roomCount} onChange={(value) => setRoomCount(value)}/>           
        <Counter title = "Bathrooms" subtitle = "How many bathrooms do you need?" value={bathroomCount} onChange={(value) => setBathroomCount(value)}/>           
        
        </div>
        )
    }


   return (
        <Modal
            isOpen={searchModal.isOpen} onClose={searchModal.onClose} onSubmit={onSubmit} body={bodyContent}title="Filters" secondaryAction={step===STEPS.LOCATION ? null : onBack} actionLabel={actionLabel} secondaryActionLabel={secondaryActionLabel}
        />
    )
}