import { describe, it, expect } from 'vitest';
import { jobApplicationSchema } from './job-application';

describe('Job Application Validation Logic', () => {
  it('should validate a correct job application', () => {
    const validData = {
      company: 'Tech Corp',
      position: 'Senior Engineer',
      salary: '$120k',
      jobUrl: 'https://example.com',
      description: 'A great job',
      notes: 'Applying soon'
    };
    const result = jobApplicationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail if company is missing', () => {
    const invalidData = {
      position: 'Senior Engineer',
    };
    const result = jobApplicationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('expected string, received undefined');
    }
  });

  it('should invalidate incorrect salary formats', () => {
    const invalidSalaries = ['abc', 'too many words here', '120k but with text'];
    
    invalidSalaries.forEach(salary => {
      const result = jobApplicationSchema.safeParse({
        company: 'Tech Corp',
        position: 'Dev',
        salary: salary
      });
      expect(result.success).toBe(false);
      if (!result.success) {
         expect(result.error.issues[0].message).toContain('Salary must be numeric');
      }
    });
  });

  it('should validate correct numeric salary formats', () => {
    const validSalaries = ['$120,000', '150000', '100k - 120k', '$90k'];
    
    validSalaries.forEach(salary => {
      const result = jobApplicationSchema.safeParse({
        company: 'Tech Corp',
        position: 'Dev',
        salary: salary
      });
      expect(result.success).toBe(true);
    });
  });
});
