import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {useState} from 'react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';

interface RegisterUserFormProps {
  phoneNumber: string;
  control: Control<
    {
      name: string;
      email: string;
      cellphone: string;
      birthdate: Date;
      gender: number;
    },
    any
  >;
  errors: FieldErrors<{
    name: string;
    email: string;
    cellphone: string;
    birthdate: Date;
    gender: number;
  }>;
}

export const RegisterUserForm: React.FC<RegisterUserFormProps> = ({
  control,
  errors,
  phoneNumber,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View className="flex flex-col space-y-2">
      <View className="flex flex-col space-y-2">
        <Text className="font-semibold text-black dark:text-white">Nome</Text>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                className="px-2 py-1.5 h-12 text-xs text-black bg-white rounded-lg dark:text-white dark:bg-background-darkLight"
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
                className="px-2 py-1.5 h-12 text-xs text-black bg-white rounded-lg dark:text-white dark:bg-background-darkLight"
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
          <TextInput
            readOnly
            className="px-2 py-1.5 h-12 text-xs text-black bg-white rounded-lg dark:text-white opacity-60 border-gray-100 dark:bg-background-darkLight"
            value={phoneNumber}
            keyboardType="phone-pad"
          />
        </View>
        {errors.cellphone && (
          <Text className="w-full text-xs font-semibold text-danger-base">
            {errors.cellphone.message}
          </Text>
        )}
      </View>
      <View className="flex flex-col space-y-2">
        <Text className="font-semibold dark:text-white">
          Data de nascimento
        </Text>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => {
              return (
                <>
                  <TouchableOpacity
                    className="text-xs text-black rounded-lg px-2 py-3.5 dark:text-white dark:bg-background-darkLight"
                    onPress={() => setOpen(true)}>
                    <Text>
                      {format(value, "dd 'de' MMMM 'de' yyyy", {locale: ptBR})}
                    </Text>
                  </TouchableOpacity>
                  <DatePicker
                    modal
                    mode="date"
                    locale="pt_BR"
                    open={open}
                    title={'Informe a data'}
                    date={value}
                    onConfirm={date => {
                      onChange(date);
                      setOpen(false);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </>
              );
            }}
            name="birthdate"
            rules={{required: true}}
          />
        </View>
        {errors.birthdate && (
          <Text className="w-full text-xs font-semibold text-danger-base">
            {errors.birthdate.message}
          </Text>
        )}
      </View>
      <View className="flex flex-col space-y-2">
        <Text className="font-semibold dark:text-white">Gênero</Text>
        <View className="text-xs text-black rounded-lg dark:text-white dark:bg-background-darkLight">
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <RNPickerSelect
                placeholder={{label: 'Informe seu gênero', value: null}}
                onValueChange={value => onChange(value)}
                value={value}
                items={[
                  {label: 'Masculino', value: 1},
                  {label: 'Feminino', value: 2},
                  {label: 'Prefiro não informar', value: 3},
                ]}
              />
            )}
            name="gender"
            rules={{required: true}}
          />
        </View>
        {errors.gender && (
          <Text className="w-full text-xs font-semibold text-danger-base">
            {errors.gender.message}
          </Text>
        )}
      </View>
    </View>
  );
};
