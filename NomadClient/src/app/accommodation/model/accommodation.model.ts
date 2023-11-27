export interface Accommodation {
  name: string;
  description: string;
  address: string,
  minGuests: number,
  maxGuests: number,
  amenities: string[],
  images: string[],
  comments: string[],
  status: string,
}
