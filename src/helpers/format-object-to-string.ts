const formatObjectToString = (value) => {
  if (typeof value === "object" && value !== null) {
    // Format each key-value pair as a string
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${formatObjectToString(val)}`)
      .join(", ");
  }
  // Return non-object values as-is
  return value != null ? String(value) : "";
};

export default formatObjectToString;
