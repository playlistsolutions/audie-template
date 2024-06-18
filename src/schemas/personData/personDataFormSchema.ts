import {z} from 'zod';

const phoneRegex = new RegExp(
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})[-\s]?(\d{4}))$/,
);
const cpfRegex = new RegExp(/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/);
const rgRegex = new RegExp(
  /^([0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9A-Za-z]{1})$/,
);
const cepRegex = new RegExp(/^\d{8}$/);

export const editPersonFormSchema = z.object({
  name: z
    .string({required_error: 'O nome do usuário é obrigatório'})
    .min(1, {message: 'O nome do usuário é obrigatório'}),
  email: z
    .string({required_error: 'O e-mail é obrigatório'})
    .email({message: 'Formato de e-mail inválido'}),
  cellphone: z
    .string({required_error: 'O telefone é obrigatório'})
    .regex(phoneRegex, 'O formato do telefone é inválido'),
  cpf: z
    .string({required_error: 'O CPF é obrigatório'})
    .regex(cpfRegex, 'O formato do CPF é inválido'),
  rg: z
    .string({required_error: 'O RG é obrigatório'})
    .regex(rgRegex, 'O formato do RG é inválido'),
});

export const editBirthdayAndGenderSchema = z.object({
  birthdate: z.date({required_error: 'A data de nascimento é obrigatória'}),
  gender: z.number({required_error: 'O gênero é obrigatória'}),
});

export const editAddressSchema = z.object({
  cep: z
    .string({required_error: 'O CEP é obrigatório'})
    .regex(cepRegex, 'Formato de CEP inválido'),
  city: z
    .string({required_error: 'A cidade é obrigatória'})
    .min(1, {message: 'A cidade é obrigatória'}),
  state: z
    .string({required_error: 'UF inválido'})
    .min(1, {message: 'UF inválido'}),
  street: z
    .string({required_error: 'A rua é obrigatória'})
    .min(1, {message: 'A rua é obrigatória'}),
  neighborhood: z
    .string({required_error: 'O bairro é obrigatório'})
    .min(1, {message: 'O bairro é obrigatório'}),
  number: z
    .string({required_error: 'O número é obrigatório'})
    .min(1, {message: 'O número é obrigatório'}),
  complement: z.string().optional(),
});
