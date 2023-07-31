import { z } from 'zod';

export const genderIdentity = ['Male', 'Female', 'Transgender', 'Non-binary', 'Prefer not to respond'] as const

const formSchema = z.object({
  name: z.string().nonempty('Name is required'),
  age: z
    .number()
    .int('Age must be an integer')
    .positive('Age must be positive')
    .min(18, 'Age must be at least 18')
    .max(99, 'Age must be less than or equal 99'),
    email: z.string().email('Invalid email address'),
    gender: z.enum(genderIdentity)
});

export default formSchema
