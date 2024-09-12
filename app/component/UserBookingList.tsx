"use client"
import React,{useState} from "react";
import { useRouter } from "next/navigation";
import { bookingDetails } from "../Interfaces/bookingDetails";
import { revalidateBooking } from "../lib/action";
const UserBookingList = ({ booking}: { booking: bookingDetails }) => {
    
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);
    const handleSubmit = async () => {
        const response = await fetch("/api/booking", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: booking._id }),
        })
        if (response.ok) {
          revalidateBooking("/dashboard");
        }
        else {
            console.log("Something went wrong");
        } 
    };
  return (
    <div key={booking._id} className="bg-green-200 mt-8 py-8 px-12 ">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <h3 className="text-xl font-meduim w-[200px] text-center lg:text-left">
          {booking.roomConfort}
        </h3>
        <div className="flex flex-col lg:flex-row gap-2 lg:!w-[400px]">
          <div className="flex items-center gap-1 flex-1">
            <span className="text-green-500 font-bold uppercase tracking-[2px]">
              from:
            </span>
            <span>{booking.checkInDate}</span>
          </div>
          <div className="flex items-center gap-1 flex-1">
            <span className="text-green-500 font-bold uppercase tracking-[2px]">
              to:
            </span>
            <span>{booking.checkOutDate}</span>
          </div>
        </div>
        <div onClick={()=>setShowAlert(true)} className="bg-green-500 cursor-pointer hover:bg-green-700 text-white rounded px-3 py-4">
          <button>Cancel Reservation</button>
        </div>
      </div>
         {showAlert && (
      <div className="absolute w-full h-screen flex flex-col items-center justify-center -translate-x-12 -translate-y-full z-[10000] bg-green-50 bg-opacity-[0.1]">
            <div className=" relative w-[400px] mt-[50%] py-16 bg-white rounded px-3 gap-6 flex flex-col justify-center items-center opacity-100">
            <h1 className="font-semibold text-center ">Are you sure you want to cancel this reservation?</h1>
            <div className="flex gap-4 w-full justify-center">
                <button onClick={handleSubmit} className="px-6 py-2 bg-red-500 rounded text-white">Yes</button>
                <button onClick={()=>setShowAlert(false)} className="px-8 py-2 bg-green-500 rounded text-white">No</button>
            </div>
            </div>
      </div>
         )}
    </div>

  );
};

export default UserBookingList;
