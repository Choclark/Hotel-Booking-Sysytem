import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { sanityFetch } from "@/sanity/lib/client";
import { bookingDetails } from "../Interfaces/bookingDetails";
import UserBookingList from "../component/UserBookingList";
import { revalidatePath, revalidateTag } from "next/cache";

const getUserBooking = async (email: string | null) => {
  try {
    const res:bookingDetails[] = await sanityFetch({
      query:`*[_type == "booking"]`,
      tags:['booking'],
    })
    console.log("dashboard fetch")
    const newdata  = res.filter(booking => booking.email === email);
    return newdata;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return []; // Fallback to an empty array on error
  }
};
const handleDelete = async (_id: string) => {
  "use server"
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: _id }),
  })
  if (response.ok) {
    revalidateTag('bookings')
    revalidatePath("/dashboard")
  }
  else {
      console.log("Something went wrong");
  } 
};

const page = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user || !user.email) {
    return (
      <section className="min-h-[80vh]">
        <div className="container mx-auto py-8 h-full">
          <p className="text-center font-medium text-md">Please log in to view your bookings.</p>
        </div>
      </section>
    );
  }

  const UserBookings: bookingDetails[] = await getUserBooking(user.email);
  console.log("neww : ", UserBookings);
  return (
    <section className="min-h-[80vh]">
      <div className="container mx-auto py-8 h-full">
        <h3 className="h3 font-bold mb-12 border-b pb-4 text-center lg:text-left">
          My Bookings
        </h3>
        <div className="">
          {UserBookings.length < 1 ? (
            <p className="text-center font-medium text-md">
              You don't have any reservation
            </p>
          ) : (
            UserBookings.map((booking) => (
              <UserBookingList key={booking._id} booking={booking} onDelete={handleDelete} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
