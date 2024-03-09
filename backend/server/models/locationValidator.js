const z = require('zod')

//validates when user creates a location
const locationValidation = data => { 
  const locationValidationSchema = z.object({
    streetAddress : z.string().min(3, 'Enter full street address'),
    city: z.string().min(3, 'City must be 3 characters or more'),
    state: z.string().max(2, 'State must be 2 letter abbreviation'),
    postalCode: z.number()
  });
  return locationValidationSchema.safeParse(data)
};

module.exports.locationValidation = locationValidation;
