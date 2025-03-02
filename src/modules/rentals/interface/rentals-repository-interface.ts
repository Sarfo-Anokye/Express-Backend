import {movie, rental} from "@prisma/client";
import {ListAllRentalsResponeType, RentalType} from "./rental-type";

export interface IRentalRepository {
  rentMovie(data: RentalType): Promise<rental>;
  returnMovie(rentalId: string): Promise<boolean>;
  getAllRentals(skip: number, take: number): Promise<ListAllRentalsResponeType>;
}
