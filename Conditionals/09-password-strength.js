/**
 * 🔒 SecureApp Password Checker
 *
 * You're building the signup page for SecureApp, a new productivity tool.
 * The product manager wants a password strength meter that gives users
 * real-time feedback as they type their password.
 *
 * The checker evaluates 5 criteria:
 *   1. At least 8 characters long
 *   2. Contains at least one uppercase letter (A-Z)
 *   3. Contains at least one lowercase letter (a-z)
 *   4. Contains at least one number (0-9)
 *   5. Contains at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)
 *
 * Strength levels based on how many criteria are met:
 *   - 0–1 criteria → "weak"
 *   - 2–3 criteria → "medium"
 *   - 4 criteria   → "strong"
 *   - All 5        → "very strong"
 *
 * Rules:
 *   - Empty string → "weak"
 *   - Non-string input → "weak"
 *
 * @param {string} password - The password to evaluate
 * @returns {string} "weak", "medium", "strong", or "very strong"
 */
export function checkPasswordStrength(password) {
  // Your code here
  if (typeof password != "string" || password === "") return "weak"

  let Ucase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let Lcase = "abcdefghijklmnopqrstuvwxyz";
  let num = "0123456789";
  let sp = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  let status = 0;

  if (password.length >= 8) status = 1;

  let uc = 0, lc = 0, nm = 0, s = 0;
  for (let i of password) {
    if (Ucase.includes(i)) uc = 1;
    else if (Lcase.includes(i)) lc = 1;
    else if (num.includes(i)) nm = 1;
    else if (sp.includes(i)) s = 1;
  }
  status += uc + lc + nm + s;

  if (status <= 1) return "weak";
  else if (status <= 3) return "medium";
  else if (status === 4) return "strong";
  else if (status === 5) return "very strong";
}