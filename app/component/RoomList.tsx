"use client"

import { useEffect,useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image";
import StarRating from "./StarRating";
interface RoomDetails{
  status:string,
  _rev: string,
  _id: string,
  id: string,
  type: string,
  pricePerNight: number,
  mainImage: { _type: string, asset: {_ref:string , _type:string} },
  _createdAt: string,
  _type: string,
  _updatedAt: string,
  confort: string;
}
const RoomList = ({rooms}:{rooms:RoomDetails[]}) => {
  enum Capacity {
    "single" = 2,
    "double" = 4,
    "suite" = 6,
  }
  enum Rate{
    "luxury" = 5,
    "vip" = 4.5,
    "standard" = 3,
    "low cash" = 2,
  }
  const tab = [
    "all",
    "single",
    "double",
    "suite"
  ]
  const  [CurrentTabValue, setCurrentTabValue] = useState("all")
  const [filteredRooms, setFilteredRooms] = useState<RoomDetails[]>(rooms)
  useEffect(() => {
    const filterd = rooms.filter((room) => {
      return CurrentTabValue === "all" ? rooms : room.type.toLowerCase() === CurrentTabValue
    })
    setFilteredRooms(filterd)
  }, [CurrentTabValue, rooms])
  return (
    <section className="py-10 min-h-[90vh]">
      <div className="w-full flex flex-col items-center justify-center mb-8">
      <h2 className="text-3xl  font-bold mb-8">Our Rooms</h2>
      <div className="w-[240px] lg:w-[540px] flex justify-center h-[200px] lg:h-auto  ">
        <div className="w-full h-full lg:h-[46px] flex flex-col lg:flex-row">
          {
            tab.map((value,index)=>{
              return <div key={value} onClick={() => setCurrentTabValue(value)} className={` cursor-pointer h-full w-full flex justify-center items-center ${CurrentTabValue === value ? "bg-green-400 text-white" : "bg-green-50 text-black"}  border-black`}>{value.toUpperCase()}</div>
            })
          }
        </div>
      </div>
      </div>
      <div className="grid grid-col-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {
        filteredRooms.map((room) => {
          return <div key={room.id}>
            <Link href={`/rooms/${room.id}`}>
              <div className="relative w-full h-[300px] overflow-hidden mb-6">
                <Image
                  src={urlFor(room.mainImage).url()}
                  alt={room.mainImage.asset._ref}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </Link>
            <div className="h-[136px]">
              <div className="flex items-center justify-between mb-3">
                <div className="text-gray-700 text-[18px] font-bold">Capacity - {Capacity[room.type.toLowerCase() as keyof typeof Capacity]}</div>
                <StarRating rate={Rate[room.confort.toLowerCase() as keyof typeof Rate]} />
              </div>
              <Link href={`/rooms/${room.id}`}>
                <h3 className="text-black font-semibold text-[30px] mb-1">{room.type}</h3>
              </Link>
              <p className="text-green-300 font-semibold text-xl">{room.pricePerNight * 600}<span className=" text-gray-300 text-sm">/ night</span></p>
            </div>
          </div>
        })
      }
      </div>
    </section>
  )
}

export default RoomList