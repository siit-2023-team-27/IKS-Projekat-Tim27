interface Amenity{
	_id: number;
	name: string;
	icon: string;
}
interface Review{
	_id: number;
	name: string;
	text: string;
	rating : number;
}
export interface Accommodation {
	_id: number;
	name: string;
	description: string;
	rating: number;
	price: number;
	images: string[],
	amenities: Amenity[],
	reviews?: Review[]
}
