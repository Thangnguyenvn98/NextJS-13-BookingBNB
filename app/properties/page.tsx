import ClientOnly from "@/app/components/ClientOnly"
import EmptyState from "@/app/components/EmptyState"
import getCurrentUser  from '@/app/actions/getCurrentUser';
import PropertiesClient from "./PropertiesClient"
import getListings from "../actions/getListings";

export default async function PropertiesPage(){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle = "Please login"/>
            </ClientOnly>
        )
    }

    const listings = await getListings({userId: currentUser.id})

    if(listings.length === 0){
        return (
            <ClientOnly>
                <EmptyState title="No properties found!" subtitle = {`Looks like you don't have any properties`}/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
                <PropertiesClient listings = {listings} currentUser={currentUser} />
            </ClientOnly>
    )
}