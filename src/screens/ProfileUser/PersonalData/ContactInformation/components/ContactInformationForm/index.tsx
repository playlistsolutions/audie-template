import {Control, Controller, FieldErrors} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';

interface ContactInformationFormProps {
  control: Control<
    {
      name: string;
      email: string;
      cellphone: string;
      cpf: string;
      rg: string;
    },
    any
  >;
  errors: FieldErrors<{
    name: string;
    email: string;
    cellphone: string;
    cpf: string;
    rg: string;
  }>;
}

export const ContactInformationForm: React.FC<ContactInformationFormProps> = ({
  control,
  errors,
}) => {
  return (
    <View className="flex flex-col space-y-2">
      <View className="flex flex-col space-y-2">
        <Text className="font-semibold text-black dark:text-white">Nome</Text>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                className="px-2 h-12 py-1.5 text-xs text-black bg-white rounded-lg dark:text-white dark:bg-background-darkLight"
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="name"
            rules={{required: true}}
          />
        </View>
        {errors.name && (
          <Text className="w-full text-xs font-semibold text-danger-base">
            {errors.name.message}
          </Text>
        )}
      </View>
      <View className="flex flex-col space-y-2">
        <Text className="font-semibold text-black dark:text-white">Email</Text>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                className="px-2 h-12 py-1.5 text-xs text-black bg-white rounded-lg dark:text-white dark:bg-background-darkLight"
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="email"
            rules={{required: true}}
          />
        </View>
        {errors.email && (
          <Text className="w-full text-xs font-semibold text-danger-base">
            {errors.email.message}
          </Text>
        )}
      </View>
      <View className="flex flex-col space-y-2">
        <Text className="font-semibold text-black dark:text-white">
          Telefone
        </Text>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                readOnly
                className="px-2 py-1.5 h-12 text-xs text-black bg-white rounded-lg dark:text-white opacity-60 border-gray-100 dark:bg-background-darkLight"
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                keyboardType="phone-pad"
              />
            )}
            name="cellphone"
            rules={{required: true}}
          />
        </View>
        {errors.cellphone && (
          <Text className="w-full text-xs font-semibold text-danger-base">
            {errors.cellphone.message}
          </Text>
        )}
      </View>
      <View className="flex flex-col space-y-2">
        <Text className="font-semibold text-black dark:text-white">RG</Text>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                className="px-2 py-1.5 h-12 text-xs text-black bg-white rounded-lg dark:text-white dark:bg-background-darkLight"
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                keyboardType="ascii-capable"
              />
            )}
            name="rg"
            rules={{required: true}}
          />
        </View>
        {errors.rg && (
          <Text className="w-full text-xs font-semibold text-danger-base">
            {errors.rg.message}
          </Text>
        )}
      </View>
      <View className="flex flex-col space-y-2">
        <Text className="font-semibold text-black dark:text-white">CPF</Text>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                maxLength={11}
                className="px-2 py-1.5 h-12 text-xs text-black bg-white rounded-lg dark:text-white dark:bg-background-darkLight"
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                keyboardType="numeric"
              />
            )}
            name="cpf"
            rules={{required: true}}
          />
        </View>
        {errors.cpf && (
          <Text className="w-full text-xs font-semibold text-danger-base">
            {errors.cpf.message}
          </Text>
        )}
      </View>
    </View>
  );
};
