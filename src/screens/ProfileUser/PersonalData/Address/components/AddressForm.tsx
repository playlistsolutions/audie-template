import {getViaCep} from '@/services/api/get-via-cep';
import {useColorScheme} from 'nativewind';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface AddressFormProps {
  control: Control<
    {
      number: string;
      cep: string;
      city: string;
      state: string;
      street: string;
      neighborhood: string;
      complement?: string | undefined;
    },
    any
  >;
  errors: FieldErrors<{
    number: string;
    cep: string;
    city: string;
    state: string;
    street: string;
    neighborhood: string;
    complement?: string | undefined;
  }>;
  setValue: UseFormSetValue<{
    number: string;
    cep: string;
    city: string;
    state: string;
    street: string;
    neighborhood: string;
    complement?: string | undefined;
  }>;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  control,
  errors,
  setValue,
}) => {
  const {colorScheme} = useColorScheme();

  function getInfoByCep(Cep: string) {
    if (Cep.length != 8) return;
    getViaCep(Cep)
      .then(response => {
        const {localidade, logradouro, uf, bairro} = response;
        setValue('city', localidade);
        setValue('neighborhood', bairro);
        setValue('street', logradouro);
        setValue('state', uf);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <View className="flex flex-col space-y-2">
      <View className="flex flex-col space-y-2">
        <Text className="font-semibold text-black dark:text-white">CEP</Text>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <TextInput
                maxLength={8}
                keyboardType="numeric"
                className="px-2 text-xs text-black bg-white rounded-lg dark:text-white dark:bg-background-darkLight"
                onBlur={() => getInfoByCep(value)}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="cep"
            rules={{required: true}}
          />
        </View>
        {errors.cep && (
          <Text className="w-full text-xs font-semibold text-danger-base">
            {errors.cep.message}
          </Text>
        )}
      </View>
      <View className="flex flex-row items-center space-x-2">
        <View className="flex flex-col w-[60%] space-y-2">
          <Text className="font-semibold text-black dark:text-white">
            Cidade
          </Text>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  keyboardType="default"
                  className="px-2 text-xs text-black bg-white rounded-lg dark:text-white dark:bg-background-darkLight"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name="city"
              rules={{required: true}}
            />
          </View>
          {errors.city && (
            <Text className="w-full text-xs font-semibold text-danger-base">
              {errors.city.message}
            </Text>
          )}
        </View>
        <View className="flex flex-col flex-1 space-y-2">
          <Text className="font-semibold text-black dark:text-white">UF</Text>
          <View className="text-xs text-black bg-white rounded-lg dark:bg-background-darkLight">
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <RNPickerSelect
                  style={{
                    inputAndroid: {color: colorScheme ? 'black' : 'white'},
                    inputIOS: {color: colorScheme ? 'black' : 'white'},
                  }}
                  placeholder={{label: 'UF', value: null}}
                  onValueChange={value => onChange(value)}
                  value={value}
                  items={[
                    {label: 'MG', value: 'MG'},
                    {label: 'BA', value: 'BA'},
                    {label: 'SP', value: 'SP'},
                  ]}
                />
              )}
              name="state"
              rules={{required: true}}
            />
          </View>
          {errors.state && (
            <Text className="w-full text-xs font-semibold text-danger-base">
              {errors.state.message}
            </Text>
          )}
        </View>
      </View>
      <View className="flex flex-row items-center space-x-2">
        <View className="flex flex-col flex-1 space-y-2">
          <Text className="font-semibold text-black dark:text-white">
            Bairro
          </Text>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  keyboardType="default"
                  className="px-2 text-xs text-black bg-white rounded-lg dark:text-white dark:bg-background-darkLight"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name="neighborhood"
              rules={{required: true}}
            />
          </View>
          {errors.street && (
            <Text className="w-full text-xs font-semibold text-danger-base">
              {errors.street.message}
            </Text>
          )}
        </View>
        <View className="flex flex-col flex-1 space-y-2">
          <Text className="font-semibold text-black dark:text-white">Rua</Text>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  keyboardType="default"
                  className="px-2 text-xs text-black bg-white rounded-lg dark:text-white dark:bg-background-darkLight"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name="street"
              rules={{required: true}}
            />
          </View>
          {errors.street && (
            <Text className="w-full text-xs font-semibold text-danger-base">
              {errors.street.message}
            </Text>
          )}
        </View>
      </View>
      <View className="flex flex-row items-start space-x-2">
        <View className="flex flex-col flex-1 space-y-2">
          <Text className="font-semibold text-black dark:text-white">
            Número
          </Text>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  keyboardType="default"
                  className="px-2 text-xs text-black bg-white rounded-lg dark:text-white dark:bg-background-darkLight"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name="number"
              rules={{required: true}}
            />
          </View>
          {errors.number && (
            <Text className="w-full text-xs font-semibold text-danger-base">
              {errors.number.message}
            </Text>
          )}
        </View>
        <View className="flex flex-col flex-1 space-y-2">
          <Text className="font-semibold text-black dark:text-white">
            Complemento
          </Text>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  keyboardType="default"
                  className="px-2 text-xs text-black bg-white rounded-lg dark:text-white dark:bg-background-darkLight"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name="complement"
              rules={{required: true}}
            />
          </View>
          {errors.complement && (
            <Text className="w-full text-xs font-semibold text-danger-base">
              {errors.complement.message}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
