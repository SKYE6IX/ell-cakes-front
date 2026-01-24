import * as z from "zod";

const registerSchema = z.object({
  name: z
    .string({
      error: "Invalid name input",
    })
    .min(3)
    .regex(/^[a-zA-Z\sА-Яа-яЁё]+$/, {
      error: "Invalid name",
    }),

  email: z.email({
    error: "Invalid email address",
  }),

  password: z
    .string()
    .min(6, { error: "Password should have minimum of 8!" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\s\S]{8,}$/, {
      error: "Invalid character!",
    }),
  phoneNumber: z.string().min(11).max(11),
});

const loginSchema = z.object({
  email: z.email({
    error: "Invalid email address",
  }),

  password: z
    .string()
    .min(6, { error: "Password should have minimum of 8!" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\s\S]{8,}$/, {
      error: "Invalid character!",
    }),
});

const updateUserSchema = z.object({
  name: z
    .string({
      error: "Invalid name input",
    })
    .min(3)
    .regex(/^[a-zA-Z\sА-Яа-яЁё]+$/, {
      error: "Invalid name",
    }),
  email: z.email({
    error: "Invalid email address",
  }),

  phoneNumber: z.string().min(11).max(11),
});

export function validateRegistrationFields(
  registerData: z.output<typeof registerSchema>
) {
  return registerSchema.safeParse(registerData);
}

export function validateLoginFields(loginData: z.output<typeof loginSchema>) {
  return loginSchema.safeParse(loginData);
}

export function validateUpdateFields(
  updateData: z.output<typeof updateUserSchema>
) {
  return updateUserSchema.safeParse(updateData);
}
