import {z} from 'zod';

const phoneRegex = new RegExp(
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})[-\s]?(\d{4}))$/,
);

export const registerFormSchema = z.object({
  name: z
    .string({required_error: 'O nome do usuário é obrigatório'})
    .min(1, {message: 'O nome do usuário é obrigatório'}),
  email: z
    .string({required_error: 'O e-mail é obrigatório'})
    .email({message: 'Formato de e-mail inválido'}),
  cellphone: z
    .string({required_error: 'O telefone é obrigatório'})
    .regex(phoneRegex, 'O formato do telefone é inválido'),
  birthdate: z.date({required_error: 'A data de nascimento é obrigatória'}),
  gender: z.number({required_error: 'O gênero é obrigatória'}),
});
