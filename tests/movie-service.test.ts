import {PrismaClient} from "@prisma/client";
import {MovieService} from "../src/modules/movie/movie-service";
import {ListAllMoviesResponeType} from "../src/modules/movie/interface/movie-type";
import {PrismaMovieRepository} from "../src/modules/movie/prisma-movie-repository";
import {CreateMovieDTO, UpdateMovieDTO} from "../src/modules/movie/movie-dto";
import CustomError from "../src/utils/custom-error";

describe("MovieService", () => {
  let movieService: MovieService;
  let mockMovieRepository: jest.Mocked<PrismaMovieRepository>;

  const mockMovie = {
    id: "1",
    title: "Test Movie",
    genre: "Action",
    releaseYear: 2023,
    director: "Test Director"
  } as any;

  const mockMovieList: ListAllMoviesResponeType = {
    data: [mockMovie],
    count: 1
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockMovieRepository = {
      createMovie: jest.fn(),
      updateMovie: jest.fn(),
      deleteMovie: jest.fn(),
      getMovieById: jest.fn(),
      getAllMovies: jest.fn()
    } as unknown as jest.Mocked<PrismaMovieRepository>;

    movieService = new MovieService(mockMovieRepository);
  });

  describe("createMovie", () => {
    const createMovieDTO: CreateMovieDTO = {
      name: "Test Movie",
      genre: "Action"
    };

    it("should create a movie successfully", async () => {
      mockMovieRepository.createMovie.mockResolvedValue(mockMovie);

      const result = await movieService.createMovie(createMovieDTO);

      expect(mockMovieRepository.createMovie).toHaveBeenCalledWith(
        createMovieDTO
      );
      expect(result).toEqual(mockMovie);
    });
  });

  describe("updateMovie", () => {
    const movieId = "1";
    const updateMovieDTO: UpdateMovieDTO = {
      name: "Updated Movie",
      genre: "Drama"
    };

    it("should update a movie when movie exists", async () => {
      mockMovieRepository.getMovieById.mockResolvedValue(mockMovie);
      mockMovieRepository.updateMovie.mockResolvedValue({
        ...mockMovie,
        ...updateMovieDTO
      });

      const result = await movieService.updateMovie(movieId, updateMovieDTO);

      expect(mockMovieRepository.getMovieById).toHaveBeenCalledWith(movieId);
      expect(mockMovieRepository.updateMovie).toHaveBeenCalledWith(
        movieId,
        updateMovieDTO
      );
      expect(result).toEqual({
        ...mockMovie,
        ...updateMovieDTO
      });
    });

    it("should throw an error when movie does not exist", async () => {
      mockMovieRepository.getMovieById.mockResolvedValue(null);

      await expect(
        movieService.updateMovie(movieId, updateMovieDTO)
      ).rejects.toThrow(
        new CustomError("failed to update movie, movie record does not exist")
      );

      expect(mockMovieRepository.getMovieById).toHaveBeenCalledWith(movieId);
      expect(mockMovieRepository.updateMovie).not.toHaveBeenCalled();
    });
  });

  describe("deleteMovie", () => {
    const movieId = "1";

    it("should delete a movie when movie exists", async () => {
      mockMovieRepository.getMovieById.mockResolvedValue(mockMovie);
      mockMovieRepository.deleteMovie.mockResolvedValue(mockMovie);

      const result = await movieService.deleteMovie(movieId);

      expect(mockMovieRepository.getMovieById).toHaveBeenCalledWith(movieId);
      expect(mockMovieRepository.deleteMovie).toHaveBeenCalledWith(movieId);
      expect(result).toEqual(mockMovie);
    });

    it("should throw an error when movie does not exist", async () => {
      mockMovieRepository.getMovieById.mockResolvedValue(null);

      await expect(movieService.deleteMovie(movieId)).rejects.toThrow(
        new CustomError("failed to delete movie, movie record does not exist")
      );

      expect(mockMovieRepository.getMovieById).toHaveBeenCalledWith(movieId);
      expect(mockMovieRepository.deleteMovie).not.toHaveBeenCalled();
    });
  });

  describe("getMovieById", () => {
    const movieId = "1";

    it("should return movie when found", async () => {
      mockMovieRepository.getMovieById.mockResolvedValue(mockMovie);

      const result = await movieService.getMovieById(movieId);

      expect(mockMovieRepository.getMovieById).toHaveBeenCalledWith(movieId);
      expect(result).toEqual(mockMovie);
    });

    it("should return null when movie not found", async () => {
      mockMovieRepository.getMovieById.mockResolvedValue(null);

      const result = await movieService.getMovieById(movieId);

      expect(mockMovieRepository.getMovieById).toHaveBeenCalledWith(movieId);
      expect(result).toBeNull();
    });
  });

  describe("getAllMovies", () => {
    it("should return all movies with default pagination", async () => {
      mockMovieRepository.getAllMovies.mockResolvedValue(mockMovieList);

      const result = await movieService.getAllMovies();

      expect(mockMovieRepository.getAllMovies).toHaveBeenCalledWith(
        0,
        10,
        undefined
      );
      expect(result).toEqual(mockMovieList);
    });

    it("should return all movies with custom pagination", async () => {
      const skip = 10;
      const take = 20;
      mockMovieRepository.getAllMovies.mockResolvedValue(mockMovieList);

      const result = await movieService.getAllMovies(skip, take);

      expect(mockMovieRepository.getAllMovies).toHaveBeenCalledWith(
        skip,
        take,
        undefined
      );
      expect(result).toEqual(mockMovieList);
    });

    it("should return all movies with search parameter", async () => {
      const skip = 0;
      const take = 10;
      const search = "action";
      mockMovieRepository.getAllMovies.mockResolvedValue(mockMovieList);

      const result = await movieService.getAllMovies(skip, take, search);

      expect(mockMovieRepository.getAllMovies).toHaveBeenCalledWith(
        skip,
        take,
        search
      );
      expect(result).toEqual(mockMovieList);
    });
  });
});
