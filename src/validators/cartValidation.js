import { celebrate, Joi, Segments } from "celebrate";

export const cartValidator = celebrate({
  [Segments.BODY]: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().min(1).max(255).required(),

        price: Joi.number().positive().required(),

        qty: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
});
