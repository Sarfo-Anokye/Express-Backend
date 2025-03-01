import sanitize, {IOptions} from "sanitize-html";
const SanitizeInput = (
  inputBody,
  options: IOptions = {
    allowedTags: [],
    allowedAttributes: {},
    allowedSchemes: []
  }
) => {
  if (typeof inputBody === "string") {
    return sanitize(inputBody, options);
  } else if (Array.isArray(inputBody)) {
    return inputBody.map((item) => SanitizeInput(item, options));
  } else if (typeof inputBody === "object" && inputBody !== null) {
    return Object.keys(inputBody).reduce((result, key) => {
      result[key] = SanitizeInput(inputBody[key], options);
      return result;
    }, {});
  }
  return inputBody;
};
export default SanitizeInput;
