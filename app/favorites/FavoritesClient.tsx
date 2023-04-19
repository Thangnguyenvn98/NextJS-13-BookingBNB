"use client"

import { useCallback, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types"
import {useRouter} from "next/navigation"
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}
export default function FavoritesClient({listings,currentUser}:FavoritesClientProps){
    const router = useRouter()


    return (
        <Container>
        <Heading title="Favorites" subtitle="List of places you have favorited!"/>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-8">
            {listings.map((listing)=> (
                <ListingCard key={listing.id} data={listing} currentUser={currentUser}/>
            ))}
        </div>
    </Container>
    )
}
