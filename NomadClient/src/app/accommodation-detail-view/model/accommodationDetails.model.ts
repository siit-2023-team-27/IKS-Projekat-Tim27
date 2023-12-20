import {Amenity} from "../../amenity/amenity.model";

export interface Review{
	_id: number;
	name: string;
	text: string;
	rating : number;
}
export interface AccommodationDetails {
  hostId: number
	status:string;
	minGuests: number;
	maxGuests: number;
	address: string,
	id: number;
	name: string;
	description: string;
	rating: number;
	images: string[],
	amenities: Amenity[],
	comments?: Review[],
	priceType?: String
}
