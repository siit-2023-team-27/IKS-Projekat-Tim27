export interface Amenity{
	_id: number;
	name: string;
	icon: string;
}
export interface Review{
	_id: number;
	name: string;
	text: string;
	rating : number;
}
export interface Accommodation {
  _id:number,
  rating:number,
  name: string;
  description: string;
  address: string,
  minGuests: number,
  maxGuests: number,
  images: string[],
  comments: string[],
  status: string,
  reviews: Review[],
  amenities: Amenity[]
}
