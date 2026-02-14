/**
 * 🎬 The Starlight Cinema
 *
 * You've just been hired at Starlight Cinema! Your first task is to build
 * the automated ticket pricing system. The manager hands you a sticky note
 * with the pricing rules scribbled on it:
 *
 * Age Groups:
 *   - Children (0–12): $8
 *   - Teens (13–17): $12
 *   - Adults (18–59): $15
 *   - Seniors (60+): $10
 *
 * Weekend Surcharge:
 *   - Add $3 on weekends (when isWeekend is true)
 *
 * Rules:
 *   - If age is negative or not a number, return -1
 *   - isWeekend is a boolean
 *
 * @param {number} age - The customer's age
 * @param {boolean} isWeekend - Whether it's a weekend
 * @returns {number} The ticket price, or -1 for invalid input
 */
export function getTicketPrice(age, isWeekend) {
  // Your code here
  if (age < 0) return -1;

  if (isWeekend) {
    if (age <= 12) return 11;
    else if (age <= 17) return 15;
    else if (age <= 59) return 18;
    else if (age >= 60) return 13;
  }
  else {
    if (age <= 12) return 8;
    else if (age <= 17) return 12;
    else if (age <= 59) return 15;
    else if (age >= 60) return 10;
  }
}
