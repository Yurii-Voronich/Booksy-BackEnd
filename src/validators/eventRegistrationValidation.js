import { celebrate, Joi, Segments } from "celebrate";

export const eventRegistrationValidator = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      "string.empty": "Імʼя обовʼязкове",
      "string.min": "Імʼя має містити мінімум 2 символи",
    }),

    email: Joi.string().email().required().messages({
      "string.email": "Некоректний email",
      "string.empty": "Email обовʼязковий",
    }),

    message: Joi.string().allow("", null).max(1000).optional(),

    dataid: Joi.string()
      .valid(
        "Cozy Book Club — “The Midnight Library”",
        "Book Cover Design Workshop",
        "Children’s Story Hour"
      )
      .required()
      .messages({
        "any.only": "Невірний тип івенту",
        "any.required": "dataid обовʼязковий",
      }),
  }),
});
