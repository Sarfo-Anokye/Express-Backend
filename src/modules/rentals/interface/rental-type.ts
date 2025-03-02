import {rental} from "@prisma/client";

export type ListAllRentalsResponeType = {
  data: rental[];
  count: number;
};

export type RentalType = {
  user_id: string;
  movie_id: string;
  rented_at: Date;
  due_date: Date;
  returned_date?: Date;
};
