import {PrismaClient, rental} from "@prisma/client";
import {ListAllRentalsResponeType, RentalType} from "./interface/rental-type";
import {IRentalRepository} from "./interface/rentals-repository-interface";

export class PrismaRentalRepository implements IRentalRepository {
  constructor(private prisma: PrismaClient) {}

  async rentMovie(data: RentalType): Promise<rental> {
    return this.prisma.rental.create({data});
  }

  async returnMovie(rentalId: string) {
    this.prisma.rental.update({
      where: {id: rentalId},
      data: {returned_at: new Date()}
    });
    return true;
  }

  async getAllRentals(
    skip: number,
    take: number
  ): Promise<ListAllRentalsResponeType> {
    const [rentals, totalRent] = await this.prisma.$transaction([
      this.prisma.rental.findMany({
        skip,
        take
      }),
      this.prisma.rental.count()
    ]);

    return {
      data: rentals,
      count: totalRent
    };
  }

  async getRentalById(rentalId: string): Promise<rental> {
    return await this.prisma.rental.findUnique({where: {id: rentalId}});
  }
}
