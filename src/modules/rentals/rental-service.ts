import CustomError from "../../utils/custom-error";
import {MovieService} from "../movie/movie-service";
import {UserService} from "../user/user-service";
import {RentalType} from "./interface/rental-type";
import {PrismaRentalRepository} from "./prisma-rental-repository";

export class RentalService {
  constructor(
    private rentalRepository: PrismaRentalRepository,
    private userService: UserService,
    private movieService: MovieService
  ) {}

  async rentMovie(data: RentalType) {
    // check if user exist
    const userExist = await this.userService.getUserById(data.user_id);
    if (!userExist)
      throw new CustomError("Failed to rent movie, user record not found");
    // check if movie exist
    const movieExist = await this.movieService.getMovieById(data.movie_id);
    if (!movieExist)
      throw new CustomError("Failed to rent movie, movie record not found");

    return this.rentalRepository.rentMovie(data);
  }

  async returnMovie(rentalId: string) {
    const rentalExist = await this.rentalRepository.getRentalById(rentalId);
    if (!rentalExist) throw new CustomError("Rental record does not exist");

    return await this.rentalRepository.returnMovie(rentalId);
  }

  async getAllRentals(skip: number, take: number) {
    return this.rentalRepository.getAllRentals(skip, take);
  }
}
