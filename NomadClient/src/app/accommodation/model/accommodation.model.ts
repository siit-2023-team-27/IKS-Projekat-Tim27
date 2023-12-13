import {Amenity} from "../../amenity/amenity.model";
import {Review} from "../../accommodation-detail-view/model/accommodationDetails.model";

export interface Accommodation {
  id:number;
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

