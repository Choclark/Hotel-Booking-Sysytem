import { client } from "@/sanity/lib/client";
import { RoomDetails } from "@/app/Interfaces/RoomDetails";
import { urlFor } from "@/sanity/lib/image";

const getRooms = async () => {
  const res: RoomDetails[] = await client.fetch(
    `*[_type == "room" && type=="Suite" && confort=="Luxury"]`
  );
  return res;
};

const Hero = async () => {
  const room: RoomDetails[] = await getRooms();
  const bgImageUrl = urlFor(room[0]?.mainImage?.asset?._ref).url(); // Get the background image URL

  return (
    <section
      className="h-[60vh] lg:h-[80vh] w-full  bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        background:"cover", // Use inline styles for dynamic background image
      }}
    >
        <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
           <div className="w-full">
           <h1 className="text-2xl md:text-3xl px-20 font-bold text-white text-center">Welcome to Azure Hotel – Where Comfort Meets Luxury. Book your perfect getaway today!</h1>
           </div>
        </div>
    </section>
  );
};

export default Hero;
