import { AccommodationDetails } from "./accommodationDetails.model";

export interface Reservation{
    "id"? : number,
    "user" : number,
    "accommodation" : number,
    "startDate" : Date,
    "finishDate" : Date,
    "numGuests" : number,
    "status" : String,
    "accommodationDetails"? : AccommodationDetails
}