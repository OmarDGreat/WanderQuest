// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// Password requirements description
export const getPasswordRequirements = () => {
  return "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number";
};

// Form validation
export const validateForm = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = values[field];
    const fieldRules = rules[field];

    fieldRules.forEach((rule) => {
      if (rule.required && !value) {
        errors[field] = rule.message || `${field} is required`;
      }

      if (rule.validate && !rule.validate(value)) {
        errors[field] = rule.message;
      }
    });
  });

  return errors;
};
