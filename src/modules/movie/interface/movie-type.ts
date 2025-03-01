import {movie} from "@prisma/client";

export type ListAllMoviesResponeType = {
  data: movie[];
  count: number;
};
