import type { User, Grade } from "../types/index";

/**
 * Get a user object by ID
 * @param id 
 * @returns 
 */
function getUser(id: number): User {
  return {
    id: id,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    role: "student",
    isActive: true,
    score: 95.5,
  };
}

/**
 * Calculate a letter grade based on score 
 * @param score
 * @param maxScore
 * @returns 
 */
function calculateGrade(score: number, maxScore: number): Grade {
  const percentage: number = (score / maxScore) * 100;
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  return "F";
}

/**
 * Format a course name with units and semester information
 * @param name - The course name
 * @param units 
 * @param semester 
 * @returns
 */
function formatCourse(name: string, units: number, semester: string): string {
  return `${name} (${units} units) - ${semester}`;
}

// Functions and display results
const user: User = getUser(1);
console.log(user);

const grade: Grade = calculateGrade(85, 100);
console.log(grade);

const course: string = formatCourse("IT Elective 4", 3, "1st Semester");
console.log(course);
