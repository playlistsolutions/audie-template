import {useState} from 'react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {useColorScheme} from 'nativewind';

interface BirthdayAndGenderFormProps {
  control: Control<
    {
      birthdate: Date;
      gender: number;
    },
    any
  >;
  errors: FieldErrors<{
    birthdate: Date;
    gender: number;
  }>;
}

export const BirthdayAndGenderForm: React.FC<BirthdayAndGenderFormProps> = ({
  control,
  errors,
}) => {
  const [open, setOpen] = useState(false);
  const {colorScheme} = useColorScheme();

  return (
    <View className="flex flex-col space-y-2">
      <View className="flex flex-col space-y-2">
        <Text className="font-semibold text-black dark:text-white">
          Data de nascimento
        </Text>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => {
              return (
                <>
                  <TouchableOpacity
                    className="text-xs text-black bg-white px-2 py-3.5 rounded-lg dark:bg-background-darkLight"
                    onPress={() => setOpen(true)}>
                    <Text className="text-black dark:text-white">
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
        <Text className="font-semibold text-black dark:text-white">Gênero</Text>
        <View className="text-xs text-black bg-white rounded-lg dark:bg-background-darkLight">
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <RNPickerSelect
                style={{
                  inputAndroid: {
                    color: colorScheme ? 'white' : 'black',
                    height: 55,
                  },
                  inputIOS: {
                    color: colorScheme ? 'white' : 'black',
                    height: 55,
                  },
                }}
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
