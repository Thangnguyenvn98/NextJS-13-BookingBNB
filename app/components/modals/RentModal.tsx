"use client"

import useRentModalStore from "@/app/hooks/useRentModal";
import Modal from "./Modal";

export default function RentModal () {
    const rentModal = useRentModalStore()
    return (
        <Modal title="Airbnb your home" isOpen={rentModal.isOpen} onClose={rentModal.onClose} onSubmit={rentModal.onClose} actionLabel="Submit"/>
    )
}