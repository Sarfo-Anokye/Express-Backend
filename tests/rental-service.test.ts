import {MovieService} from "../src/modules/movie/movie-service";
import {RentalType} from "../src/modules/rentals/interface/rental-type";
import {PrismaRentalRepository} from "../src/modules/rentals/prisma-rental-repository";
import {RentalService} from "../src/modules/rentals/rental-service";
import {UserService} from "../src/modules/user/user-service";
import CustomError from "../src/utils/custom-error";

describe("RentalService", () => {
  let rentalService: RentalService;
  let mockRentalRepository: jest.Mocked<PrismaRentalRepository>;
  let mockUserService: jest.Mocked<UserService>;
  let mockMovieService: jest.Mocked<MovieService>;

  // Mock rental data
  const mockRental = {
    id: "rental1",
    user_id: "user1",
    movie_id: "movie1",
    rented_at: new Date(),
    returned_at: null,
    due_date: new Date()
  };

  const mockUser = {
    id: "user1",
    name: "Test User"
  } as any;

  const mockMovie = {
    id: "movie1",
    title: "Test Movie"
  } as any;

  const mockRentalsList = {
    data: [mockRental],
    count: 1
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockRentalRepository = {
      rentMovie: jest.fn(),
      returnMovie: jest.fn(),
      getRentalById: jest.fn(),
      getAllRentals: jest.fn()
    } as unknown as jest.Mocked<PrismaRentalRepository>;

    mockUserService = {
      getUserById: jest.fn()
    } as unknown as jest.Mocked<UserService>;

    mockMovieService = {
      getMovieById: jest.fn()
    } as unknown as jest.Mocked<MovieService>;

    // Create the RentalService with mock dependencies
    rentalService = new RentalService(
      mockRentalRepository,
      mockUserService,
      mockMovieService
    );
  });

  describe("rentMovie", () => {
    const rentalData: RentalType = {
      user_id: "user1",
      movie_id: "movie1",
      rented_at: new Date(),
      due_date: new Date()
    };

    it("should rent a movie successfully when user and movie exist", async () => {
      mockUserService.getUserById.mockResolvedValue(mockUser);
      mockMovieService.getMovieById.mockResolvedValue(mockMovie);
      mockRentalRepository.rentMovie.mockResolvedValue(mockRental);

      const result = await rentalService.rentMovie(rentalData);

      expect(mockUserService.getUserById).toHaveBeenCalledWith(
        rentalData.user_id
      );
      expect(mockMovieService.getMovieById).toHaveBeenCalledWith(
        rentalData.movie_id
      );
      expect(mockRentalRepository.rentMovie).toHaveBeenCalledWith(rentalData);
      expect(result).toEqual(mockRental);
    });

    it("should throw an error when user does not exist", async () => {
      mockUserService.getUserById.mockResolvedValue(null);

      await expect(rentalService.rentMovie(rentalData)).rejects.toThrow(
        new CustomError("Failed to rent movie, user record not found")
      );

      expect(mockUserService.getUserById).toHaveBeenCalledWith(
        rentalData.user_id
      );
      expect(mockMovieService.getMovieById).not.toHaveBeenCalled();
      expect(mockRentalRepository.rentMovie).not.toHaveBeenCalled();
    });

    it("should throw an error when movie does not exist", async () => {
      mockUserService.getUserById.mockResolvedValue(mockUser);
      mockMovieService.getMovieById.mockResolvedValue(null);

      await expect(rentalService.rentMovie(rentalData)).rejects.toThrow(
        new CustomError("Failed to rent movie, movie record not found")
      );

      expect(mockUserService.getUserById).toHaveBeenCalledWith(
        rentalData.user_id
      );
      expect(mockMovieService.getMovieById).toHaveBeenCalledWith(
        rentalData.movie_id
      );
      expect(mockRentalRepository.rentMovie).not.toHaveBeenCalled();
    });
  });

  describe("returnMovie", () => {
    const rentalId = "rental1";
    const returnedRental = {
      ...mockRental,
      returned_at: new Date()
    };

    it("should return a movie successfully when rental exists", async () => {
      mockRentalRepository.getRentalById.mockResolvedValue(mockRental);
      mockRentalRepository.returnMovie.mockResolvedValue(true);

      const result = await rentalService.returnMovie(rentalId);

      expect(mockRentalRepository.getRentalById).toHaveBeenCalledWith(rentalId);
      expect(mockRentalRepository.returnMovie).toHaveBeenCalledWith(rentalId);
      expect(result).toBeTruthy();
    });

    it("should throw an error when rental does not exist", async () => {
      mockRentalRepository.getRentalById.mockResolvedValue(null);

      await expect(rentalService.returnMovie(rentalId)).rejects.toThrow(
        new CustomError("Rental record does not exist")
      );

      expect(mockRentalRepository.getRentalById).toHaveBeenCalledWith(rentalId);
      expect(mockRentalRepository.returnMovie).not.toHaveBeenCalled();
    });
  });

  describe("getAllRentals", () => {
    it("should return all rentals with default pagination", async () => {
      const skip = 0;
      const take = 10;
      mockRentalRepository.getAllRentals.mockResolvedValue(mockRentalsList);

      const result = await rentalService.getAllRentals(skip, take);

      expect(mockRentalRepository.getAllRentals).toHaveBeenCalledWith(
        skip,
        take
      );
      expect(result).toEqual(mockRentalsList);
    });

    it("should return all rentals with custom pagination", async () => {
      const skip = 10;
      const take = 20;
      mockRentalRepository.getAllRentals.mockResolvedValue(mockRentalsList);

      const result = await rentalService.getAllRentals(skip, take);

      expect(mockRentalRepository.getAllRentals).toHaveBeenCalledWith(
        skip,
        take
      );
      expect(result).toEqual(mockRentalsList);
    });
  });
});
