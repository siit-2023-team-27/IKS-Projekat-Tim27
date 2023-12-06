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
export interface AccommodationDetails {
	status:string;
	minGuests: number;
	maxGuests: number;
	address: string,
	id: number;
	name: string;
	description: string;
	rating: number;
	// price: number;
	images: string[],
	amenities: Amenity[],
	comments?: Review[]
}
