import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { TbArrowsMaximize, TbUser } from "react-icons/tb";
import Reservation from "@/app/component/Reservation";
import { RoomDetails } from '../../Interfaces/RoomDetails';
import { bookingDetails } from "@/app/Interfaces/bookingDetails";
import { roomDetails } from "@/app/Static_data/roomDetail";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const getRoomData = async (id: string) => {
  const res = await client.fetch(`*[_type == "room" && id == "${id}"]`);
  return res[0];
};
const getBooking = async () =>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking`,{next:{tags:['bookings']}})
  if(res.ok) {
    const data = await res.json()
    return data.data
  }
  else return []
}



const RoomDetailPage = async ({ params }: { params: { id: string } }) => {
  const { isAuthenticated, getUser } = await getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user  = await getUser()
  const room: RoomDetails = await getRoomData(params.id);
  enum Capacity {
    "single" = 2,
    "double" = 4,
    "suite" = 6,
  }
  const bookings:bookingDetails[] = await getBooking();
  console.log(bookings)
  return (
    <section className="min-h-[90vh] relative">
      <div className="container  mx-auto py-8 pl-8 ">
        <div className="flex flex-col lg:flex-row lg:gap-12 h-full">
          <div className="relative flex flex-col lg:w-[65%]">
            <div className="relative h-[360px] w-[100%] lg:h-[420px] mb-8">
              <Image
                src={urlFor(room.mainImage).url()}
                priority
                fill
                className="object-cover"
                alt="room image"
              />
            </div>
            <div className=" flex justify-between items-center w-full mb-2">
              <h3 className="text-black font-semibold items-center text-[30px] mb-1">
                {room.confort} / {room.type}
              </h3>
              <p className="text-green-300 font-semibold text-xl">
                {room.pricePerNight}
                <span className=" text-gray-300 text-sm">/ night</span>
              </p>
            </div>
            <div className=" flex gap-2">
              <div className="flex items-center gap-2">
                <div className="text-2xl text-green-300">
                  <TbArrowsMaximize />
                </div>
                <p>
                  {Capacity[room.type.toLowerCase() as keyof typeof Capacity] *
                    70}{" "}
                  m <sup>2</sup>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-2xl text-green-300">
                  <TbUser />
                </div>
                <p>
                  {Capacity[room.type.toLowerCase() as keyof typeof Capacity]}{" "}
                  Guest <sup>2</sup>
                </p>
              </div>
            </div>
            <div className="my-2 text-xl font-semibold text-green-400 "> Description</div>
              <p className="ml-6">
                    {roomDetails[room.confort.toLowerCase() as keyof typeof roomDetails].description}
              </p>
            <div className="my-2 text-xl font-semibold text-green-400 ">
              Key Features
            </div>
              <div className="pl-8">
              <ul className=" font-semibold text-sm pl-[10px]">
                {roomDetails[room.confort.toLowerCase() as keyof typeof roomDetails].keyFeatures.map(
                  (feature) => (
                    <li key={feature} className=" list-disc">{feature}</li> 
                  )
              )}
              </ul>
              </div>
          </div>

          <div className="lg:w-[35%]">
            <Reservation reservation={bookings} room={room} user={user} isUserAuthenticated={isUserAuthenticated}/>
            </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetailPage;
