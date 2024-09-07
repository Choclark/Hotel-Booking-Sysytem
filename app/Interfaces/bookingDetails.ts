interface guestDetails{
  
    _type: 'guest';
    name: string;
    _key: string;
    age: string;
  
}
export interface bookingDetails{
  roomConfort: string;
    _id: string;
    choosenRoom: string;
    _type: 'booking',
    priceAnight: number;
    checkOutDate: string;
    checkInDate: string;
    id: number;
    _createdAt: string;
    name: string;
    email: string;
    roomType: string;
    _rev: string;
    totalAmountPaid: number;
    guests: guestDetails[];
    _updatedAt: string;
}