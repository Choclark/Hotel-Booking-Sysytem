'use server'

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export const  revalidateBooking = (url:string) => {
    revalidateTag('bookings')
    revalidatePath("/dashbaord")
    revalidatePath("/rooms")
    redirect(url)
} 

export const handleDelete = async (_id:string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id:_id }),
      })
      if (response.ok) {
        revalidateTag("booking")
        revalidatePath(`${process.env.NEXT_PUBLIC_BASE_URL}/dashbaord`)
        redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`)
        return false
      }
      else {
          console.log("Something went wrong");
      } 
      return true
  };