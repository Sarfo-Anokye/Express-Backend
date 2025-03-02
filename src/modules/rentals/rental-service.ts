import CustomError from "../../utils/custom-error";
import {RentalType} from "./interface/rental-type";
import {PrismaRentalRepository} from "./prisma-rental-repository";

export class RentalService {
  constructor(private rentalRepository: PrismaRentalRepository) {}

  async rentMovie(data: RentalType) {
    // check if user exist
    // check if movie exist
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
