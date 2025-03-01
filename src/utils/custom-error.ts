class CustomError extends Error {
  public readonly code: string; // Optional custom property
  public readonly isCustomError: boolean;

  constructor(message: string, code: string = "UNKNOWN_ERROR") {
    super(message);
    this.name = "CustomError"; // Set the name of the error
    this.code = code;
    this.isCustomError = true; // Flag for identifying custom errors
    Object.setPrototypeOf(this, CustomError.prototype); // Restore prototype chain
  }
}

export default CustomError;
