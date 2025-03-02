import {PrismaClient, user} from "@prisma/client";
import {UserService} from "../src/modules/user/user-service";
import {PrismaUserRepository} from "../src/modules/user/prisma-user-repository";
import {ListAllUsersResponeType} from "../src/modules/user/interface/user-type";
import {CreateUserDTO, UpdateUserDTO} from "../src/modules/user/user-dto";
import CustomError from "../src/utils/custom-error";

// Mock the PrismaClient
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({}))
}));

describe("UserService", () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<PrismaUserRepository>;
  let mockPrisma: jest.Mocked<PrismaClient>;

  const mockUser = {
    id: "1",
    email: "test@example.com",
    name: "Test User"
  } as user;

  const mockUserList: ListAllUsersResponeType = {
    data: [mockUser],
    count: 1
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Create a mock Prisma client
    mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;

    mockUserRepository = {
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      getUserById: jest.fn(),
      getUserByEmail: jest.fn(),
      getAllUsers: jest.fn()
    } as unknown as jest.Mocked<PrismaUserRepository>;

    // Create the UserService with the mock repository
    userService = new UserService(mockUserRepository);
  });

  describe("createUser", () => {
    const createUserDTO: CreateUserDTO = {
      email: "test@example.com",
      name: "Test User"
    };

    it("should create a user when email does not exist", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(null);
      mockUserRepository.createUser.mockResolvedValue(mockUser);

      const result = await userService.createUser(createUserDTO);

      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(
        createUserDTO.email
      );
      expect(mockUserRepository.createUser).toHaveBeenCalledWith(createUserDTO);
      expect(result).toEqual(mockUser);
    });

    it("should throw an error when email already exists", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(mockUser);

      await expect(userService.createUser(createUserDTO)).rejects.toThrow(
        new CustomError("failed to create user, email already exist")
      );

      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(
        createUserDTO.email
      );
      expect(mockUserRepository.createUser).not.toHaveBeenCalled();
    });
  });

  describe("updateUser", () => {
    const userId = "1";
    const updateUserDTO: UpdateUserDTO = {
      email: "updated@example.com",
      name: "Updated User"
    };

    it("should update a user when user exists and email is not in use", async () => {
      mockUserRepository.getUserById.mockResolvedValue(mockUser);
      mockUserRepository.getUserByEmail.mockResolvedValue(null);
      mockUserRepository.updateUser.mockResolvedValue({
        ...mockUser,
        ...updateUserDTO
      });

      const result = await userService.updateUser(userId, updateUserDTO);

      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(
        updateUserDTO.email
      );
      expect(mockUserRepository.updateUser).toHaveBeenCalledWith(
        userId,
        updateUserDTO
      );
      expect(result).toEqual({
        ...mockUser,
        ...updateUserDTO
      });
    });

    it("should throw an error when user does not exist", async () => {
      mockUserRepository.getUserById.mockResolvedValue(null);

      await expect(
        userService.updateUser(userId, updateUserDTO)
      ).rejects.toThrow(
        new CustomError("failed to update user, user does not exist")
      );

      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.updateUser).not.toHaveBeenCalled();
    });

    it("should throw an error when email is already in use by another user", async () => {
      const anotherUser = {...mockUser, id: "2"};
      mockUserRepository.getUserById.mockResolvedValue(mockUser);
      mockUserRepository.getUserByEmail.mockResolvedValue(anotherUser);

      await expect(
        userService.updateUser(userId, updateUserDTO)
      ).rejects.toThrow(
        new CustomError(
          "failed to update user,email is already in use by another user"
        )
      );

      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(
        updateUserDTO.email
      );
      expect(mockUserRepository.updateUser).not.toHaveBeenCalled();
    });

    it("should allow update if the email belongs to the same user being updated", async () => {
      mockUserRepository.getUserById.mockResolvedValue(mockUser);
      mockUserRepository.getUserByEmail.mockResolvedValue(mockUser); // Same ID
      mockUserRepository.updateUser.mockResolvedValue({
        ...mockUser,
        ...updateUserDTO
      });

      const result = await userService.updateUser(userId, updateUserDTO);

      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(
        updateUserDTO.email
      );
      expect(mockUserRepository.updateUser).toHaveBeenCalledWith(
        userId,
        updateUserDTO
      );
      expect(result).toEqual({
        ...mockUser,
        ...updateUserDTO
      });
    });
  });

  describe("deleteUser", () => {
    const userId = "1";

    it("should delete a user when user exists", async () => {
      mockUserRepository.getUserById.mockResolvedValue(mockUser);
      mockUserRepository.deleteUser.mockResolvedValue(true);

      const result = await userService.deleteUser(userId);

      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(userId);
      expect(result).toBeTruthy();
    });

    it("should throw an error when user does not exist", async () => {
      mockUserRepository.getUserById.mockResolvedValue(null);

      await expect(userService.deleteUser(userId)).rejects.toThrow(
        new CustomError("failed to delete user, user does not exist")
      );

      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.deleteUser).not.toHaveBeenCalled();
    });
  });

  describe("userExists", () => {
    const email = "test@example.com";

    it("should return true when user exists", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(mockUser);

      const result = await userService.userExists(email);

      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(email);
      expect(result).toBe(true);
    });

    it("should return false when user does not exist", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(null);

      const result = await userService.userExists(email);

      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(email);
      expect(result).toBe(false);
    });
  });

  describe("getUserById", () => {
    const userId = "1";

    it("should return user when found", async () => {
      mockUserRepository.getUserById.mockResolvedValue(mockUser);

      const result = await userService.getUserById(userId);

      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockUser);
    });

    it("should return null when user not found", async () => {
      mockUserRepository.getUserById.mockResolvedValue(null);

      const result = await userService.getUserById(userId);

      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toBeNull();
    });
  });

  describe("getUserByEmail", () => {
    const email = "test@example.com";

    it("should return user when found", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(mockUser);

      const result = await userService.getUserByEmail(email);

      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(mockUser);
    });

    it("should return null when user not found", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(null);

      const result = await userService.getUserByEmail(email);

      expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(email);
      expect(result).toBeNull();
    });
  });

  describe("getAllUsers", () => {
    it("should return all users with default pagination", async () => {
      mockUserRepository.getAllUsers.mockResolvedValue(mockUserList);

      const result = await userService.getAllUsers();

      expect(mockUserRepository.getAllUsers).toHaveBeenCalledWith(
        0,
        10,
        undefined
      );
      expect(result).toEqual(mockUserList);
    });

    it("should return all users with custom pagination", async () => {
      const skip = 10;
      const take = 20;
      mockUserRepository.getAllUsers.mockResolvedValue(mockUserList);

      const result = await userService.getAllUsers(skip, take);

      expect(mockUserRepository.getAllUsers).toHaveBeenCalledWith(
        skip,
        take,
        undefined
      );
      expect(result).toEqual(mockUserList);
    });

    it("should return all users with search parameter", async () => {
      const skip = 0;
      const take = 10;
      const search = "test";
      mockUserRepository.getAllUsers.mockResolvedValue(mockUserList);

      const result = await userService.getAllUsers(skip, take, search);

      expect(mockUserRepository.getAllUsers).toHaveBeenCalledWith(
        skip,
        take,
        search
      );
      expect(result).toEqual(mockUserList);
    });
  });
});
