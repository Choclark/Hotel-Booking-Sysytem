import { bookingDetails } from "@/app/Interfaces/bookingDetails";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
    console.log("hello")
    const res = await client.fetch(`*[_type == "booking"]`).catch(err => {return err})
    if(res.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
    }
    return NextResponse.json({res},{status:200})
}
export  async function POST(request:Request) {
    const {newBooking}:{newBooking:bookingDetails} = await request.json();
    const res = await client.create({
        _type: "booking",
        choosenRoom: newBooking.choosenRoom,
        checkInDate: newBooking.checkInDate,
        checkOutDate: newBooking.checkOutDate,
        name: newBooking.name,
        email: newBooking.email,
        roomType: newBooking.roomType,
        roomConfort: newBooking.roomConfort,
        id: newBooking.id,
        priceAnight: newBooking.priceAnight,
        totalAmountPaid: newBooking.totalAmountPaid
    }).catch((err)=>{
        return err
    })
    if(res.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
    }
    return NextResponse.json({message:"success"},{status:200})
}

export async function DELETE(request:Request) {
    const { _id } = await request.json();
    const res = await client.delete(_id).catch((err)=>{
        return err
    })
    if(res.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
    }
    console.log(res)
    return NextResponse.json({message:"success"},{status:200})
}