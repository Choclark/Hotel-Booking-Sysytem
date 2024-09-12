"use client";
import { useState, useEffect } from "react";
import { RoomDetails } from "@/app/Interfaces/RoomDetails";
import { ReserveDateDetail } from "@/app/Interfaces/ReserveDateDetails";
import { bookingDetails } from "../Interfaces/bookingDetails";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useRouter } from "next/navigation";
import { revalidateBooking } from "../lib/action";

const Reservation = ({
  reservation,
  room,
  user,
  isUserAuthenticated,
}: {
  reservation: bookingDetails[];
  room: RoomDetails;
  user: any;
  isUserAuthenticated: boolean;
}) => {
  
  const [resDate, setResDate] = useState<ReserveDateDetail>({
    checkInDate: "",
    checkOutDate: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setResDate({ ...resDate, [name]: value });
  };
  const [minDate, setMinDate] = useState<string>("");
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [minOutDate, setMinOutDate] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<{
    type: "error" | "success" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Add 1 day to today's date
    const tomorrow = today.toISOString().split("T")[0]; // Format it as YYYY-MM-DD
    setMinDate(tomorrow);
    today.setDate(today.getDate() + 1); // Add 1 day to today's date
    const nexday = today.toISOString().split("T")[0]; // Format it as YYYY-MM-DD
    setMinOutDate(nexday);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage({
        type: null,
        message: "",
      });
    }, 30000);
    return () => clearTimeout(timer);
  }, [alertMessage.message]);
  const handleSubmit = async () => {
    
    setSubmiting(true);
    if (resDate.checkInDate === "" || resDate.checkOutDate === "") {
      setAlertMessage({
        type: "error",
        message: "Please select check in and check out date",
      });
      setSubmiting(false);
      return;
    }
    if (resDate.checkInDate === resDate.checkOutDate) {
      setAlertMessage({
        type: "error",
        message: "Please select different check in and check out date",
      });
      setSubmiting(false);
      return;
    }
    if (resDate.checkInDate > resDate.checkOutDate) {
      setAlertMessage({
        type: "error",
        message: "Please select check in date less than check out date",
      });
      setSubmiting(false);
      return;
    }
    // Function to check if a booking conflict exists
    const isBookingConflict = () => {
      return reservation.some((existingBooking) => {
        if (existingBooking.choosenRoom === room.id) {
          const existingCheckIn = new Date(
            existingBooking.checkInDate
          ).getTime();
          const existingCheckOut = new Date(
            existingBooking.checkOutDate
          ).getTime();
          const selectedCheckIn = new Date(resDate.checkInDate).getTime();
          const selectedCheckOut = new Date(resDate.checkOutDate).getTime();

          // Check if the selected dates overlap with existing booking dates
          return (
            selectedCheckIn < existingCheckOut &&
            selectedCheckOut > existingCheckIn
          );
        }
        return false;
      });
    };

    // Check if there is a conflict before proceeding
    if (isBookingConflict()) {
      setAlertMessage({
        type: "error",
        message: "This room is already booked for the selected dates",
      });
      setSubmiting(false);
      return;
    }
    const calculateDaysBetweenDates = () => {
      const checkInDate = new Date(resDate.checkInDate);
      const checkOutDate = new Date(resDate.checkOutDate);

      // Calculate difference in milliseconds
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();

      // Convert the difference from milliseconds to days (1 day = 86400000 ms)
      const daysBetween = Math.ceil(timeDiff / (1000 * 3600 * 24));

      return daysBetween;
    };
    const newBooking: bookingDetails = {
      checkInDate: resDate.checkInDate,
      checkOutDate: resDate.checkOutDate,
      choosenRoom: room.id,
      name: user.given_name + " " + user.family_name,
      email: user.email,
      roomType: room.type,
      roomConfort: room.confort,
      id: `BKG-${reservation.length<10 && "00" }${reservation.length<100 && reservation.length>10 && "0" }${reservation.length+1}`,
      priceAnight: room.pricePerNight,
      _id: "",
      _createdAt: "",
      _rev: "",
      _type: "booking",
      _updatedAt: "",
      guests: [],
      totalAmountPaid: room.pricePerNight * calculateDaysBetweenDates(),
    };
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newBooking }),
    });
    if (res.ok) {
      const data = await res.json();
      setAlertMessage({
        type: "success",
        message: `Success! Your room has been successfully booked from ${resDate.checkInDate} to ${resDate.checkOutDate} for a total of ${calculateDaysBetweenDates()} nights. We look forward to welcoming you! A confirmation email has been sent to ${user.email}. If you have any questions, feel free to contact us. Thank you for choosing us for your stay!`,
      });
      revalidateBooking("/")
    } else {
      const data = await res.json();
      setAlertMessage({
        type: "error",
        message: data.message,
      });
    }
    setSubmiting(false);
  };
  return (
    <div className="h-[320px] mb-4 bg-green-100 mt-2">
      <div className="bg-green-500 py-4 text-center relative mb-2">
        <h4 className="text-xl text-white">Book your room</h4>
        <div className="absolute -bottom-[8px] left-[calc(50%_-_10px)] h-0 w-0 border-l-[10px] border-l-transparent border-t-[8px] border-t-green-500 border-r-[10px] border-r-transparent "></div>
      </div>
      <div className="flex flex-col gap-4 w-full py-6 px-8">
        <div className="p-2 w-fit h-fit border-2 text-green-400 border-green-400 ">
          <label htmlFor="checkInDate">CHECK IN : </label>
          <input
            type="date"
            name="checkInDate"
            value={`${resDate.checkInDate === "" ? "CHECK IN" : resDate.checkInDate}`}
            onChange={handleChange}
            required
            placeholder="CHECK IN"
            className="w-[200px] outline-none p-2 bg-transparent"
            min={minDate}
          />
        </div>
        <div className="p-2 w-fit h-fit border-2 text-green-400 border-green-400">
          <label htmlFor="checkInDate">CHECK OUT : </label>
          <input
            type="date"
            name="checkOutDate"
            value={`${resDate.checkOutDate === "" ? "CHECK IN" : resDate.checkOutDate}`}
            onChange={handleChange}
            required
            placeholder="CHECK OUT"
            className="w-[200px] outline-none p-2 bg-transparent"
            min={minOutDate}
          />
        </div>
        {isUserAuthenticated ? (
          <>
            {!submiting ? (
              <button
                onClick={handleSubmit}
                className="size-14 w-full bg-green-400 hover:bg-green-500 duration-500 text-white"
              >
                Book Now
              </button>
            ) : (
              <button
                type="button"
                className="flex items-center justify-center size-14 w-full bg-green-400 hover:bg-green-500 duration-500 text-white"
                disabled
              >
                <svg
                  className="mr-3 h-7 w-8 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="font-medium"> Submiting... </span>
              </button>
            )}
          </>
        ) : (
          <LoginLink>
            <button className="size-14 w-full bg-green-400 hover:bg-green-500 duration-500 text-white">
              Book Now
            </button>
          </LoginLink>
        )}
      </div>
      {alertMessage && alertMessage.type && (
        <div
          className={`${alertMessage.type === "error" ? "bg-red-500" : "bg-green-500"} py-4 text-center relative mb-2`}
        >
          <h4 className="text-md text-white">
            {alertMessage.message}Submiting
          </h4>
        </div>
      )}
    </div>
  );
};

export default Reservation;
