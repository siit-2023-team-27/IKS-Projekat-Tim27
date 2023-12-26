import {Amenity} from "../../amenity/amenity.model";

export interface Review{
	id: number;
	userName: string;
	text: string;
	rating : number;
	accommodationId: number;
	userId: number;
}
export interface AccommodationDetails {
  hostId: number;
	minGuests: number;
	maxGuests: number;
	address: string,
	id: number;
	name: string;
	description: string;
	images: string[];
	amenities: Amenity[];
	ratings?: Review[];
  defaultPrice: number;
  priceType:string;
  accommodationType: string;
  conformationType: string;
  deadlineForCancellation: number;
  status: string;
  verified: boolean;
}
