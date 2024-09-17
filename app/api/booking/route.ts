import { bookingDetails } from "@/app/Interfaces/bookingDetails";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
    console.log("hello")
    const res = await client.fetch(`*[_type == "booking"]`).catch(err => {return err})
    console.log("from back each time ",res)
    if(res.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
    }
    return NextResponse.json({data:res},{status:200})
}
export  async function POST(request:Request) {
    const {newBooking}:{newBooking:bookingDetails} = await request.json();
    const existingBooking = await client.fetch(`*[_type == "booking" && choosenRoom == "${newBooking.choosenRoom}"]{
        _id,
        checkInDate,
        checkOutDate,
    }`).then((data:bookingDetails[])=>{
       const newdata =  data.filter(booking =>
            newBooking.checkInDate < booking.checkOutDate && newBooking.checkOutDate > booking.checkInDate
          );
          return newdata
    }).catch(err => {return err})
    if(existingBooking.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
    }
    if(existingBooking.length > 0){
        return NextResponse.json({message:"Room is already booked for the selected dates"},{status:400})
    }
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
        totalAmountPaid: newBooking.totalAmountPaid,
        guests:[]
    }).catch((err)=>{
        return err
    })
    if(res.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
    }
    let newData = await client.fetch(`*[_type == "booking" && _id == "${res._id}"]{
        _id,
        checkInDate,
        checkOutDate,
    }`).then((data:bookingDetails[])=>{
        return data
    }).catch(err => {return err})
    while(newData.length == 0){
        newData = await client.fetch(`*[_type == "booking" && id == "${res.id}"]{
            _id,
            checkInDate,
            checkOutDate,
        }`).then((data:bookingDetails[])=>{
            return data
        }).catch(err => {return err})
        await new Promise(resolve => setTimeout(resolve, 1000));
        if(newData.isNetworkError){
            return NextResponse.json({message:"Success"},{status:200})
        }
        console.log("new data",newData)
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