// Validation function
export const ValidateField = (
  name: string,
  value: string,
  password: string | undefined = undefined,
): string => {
  switch (name) {
    case "firstName":
    case "lastName":
      if (!value.trim()) return "This field is required.";
      return "";

    case "email":
      if (!value.trim()) return "Email is required.";
      if (!/^\S+@\S+\.\S+$/.test(value)) return "Email is invalid.";
      return "";

    case "mobileNumber": {
      if (!value.trim()) return "Mobile number is required.";
      const cleanNumber = value.replace(/[\s()-]/g, "");
      if (!/^\+27\d{9}$/.test(cleanNumber))
        return "Mobile number must be in format +27XXXXXXXXX (9 digits after +27).";
      return "";
    }
    case "password":
      if (!value) return "Password is required.";
      if (value.length < 6) return "Password must be at least 6 characters.";
      return "";

    case "confirmPassword": {
      if (!value) return "Please confirm your password.";
      if (password === undefined) return "";
      if (value !== password) return "Passwords do not match.";
      return "";
    }

    case "firmId": {
      const guidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      if (!guidRegex.test(String(value))) {
        return "ID is invalid.";
      }
      return "";
    }

    default:
      return "";
  }
};
