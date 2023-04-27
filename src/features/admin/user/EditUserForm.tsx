import { TextInput, MultiSelect, Select } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import axios from 'axios';
import { useEffect } from 'react';
import { schema } from './hooks/shema';
import { Button } from '@/components/common/Button';
import { useSelectBeacons } from '@/features/admin/user/hooks/beaconSelector';
import { useRoles } from '@/features/admin/user/hooks/editingUserState';
import { useSelectTags } from '@/features/admin/user/hooks/tagSelector';
import { UserEditor } from '@/types/user';

import { endpoints } from '@/utils/api';

export const EditUserForm = (props: { user: UserEditor }) => {
  const selectBeacons = useSelectBeacons();
  const selectTags = useSelectTags();
  const roles = useRoles();

  const form = useForm({
    initialValues: {
      name: props.user.name,
      uuid: props.user.uuid,
      email: props.user.email,
      role: props.user.role,
      communityId: 1,
      beaconName: props.user.beaconName,
      tagIds: [],
    },
    validate: zodResolver(schema),
  });

  useEffect(() => {
    if (form.values.beaconName === 'FCS1301') {
      form.setValues({ uuid: '' });
    } else {
      form.setValues({ uuid: '00000' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.beaconName, form.setValues]);

  // useEffect(() => {
  //   form.setValues({ name: props.user.name });
  //   form.setValues({ uuid: props.user.uuid });
  //   form.setValues({ email: props.user.email });
  //   form.setValues({ role: props.user.role });
  //   form.setValues({ communityId: 1 });
  //   form.setValues({ beaconName: props.user.beaconName });
  //   form.setValues({ tagIds: [] });
  // }, []);

  return (
    <div>
      <div className='rounded-lg bg-slate-200'>
        <form
          className=' flex flex-col gap-2 px-10 py-4'
          onSubmit={form.onSubmit((values) =>
            // console.log(values)
            axios
              .post(endpoints.users2, values)
              .then(() => {
                window.alert('成功しました');
              })
              .catch((err) => {
                if (err.response.status === 409) {
                  window.alert('このメールアドレスは既に登録されています');
                } else {
                  window.alert('失敗しました');
                }
                console.error(err.response.status);
              }),
          )}
        >
          <TextInput placeholder='tarou' label='名前' {...form.getInputProps('name')} />
          <TextInput
            label='Gメールアドレス'
            placeholder='your@gmail.com'
            {...form.getInputProps('email')}
          />
          <div className='flex space-x-4'>
            <Select
              className='w-1/2'
              label='ビーコンの形態'
              placeholder='ビーコンの形態を選択してください'
              data={selectBeacons}
              {...form.getInputProps('beaconName')}
            />
            <Select
              label='権限'
              className='w-1/2'
              placeholder='権限レベルを選択してください'
              data={roles}
              {...form.getInputProps('role')}
            />
          </div>
          {form.values.beaconName === 'FCS1301' && (
            <>
              <TextInput label='UUID(5文字)' placeholder='UUID' {...form.getInputProps('uuid')} />
              {/* {form.setValues({ ...form.values, uuid: 'abcdf' })} */}
            </>
          )}
          <MultiSelect
            label='タグ'
            placeholder='属性を選択してください'
            data={selectTags}
            {...form.getInputProps('tagIds')}
          />
          <div className=' mx-auto'>
            <Button color='blue'>登録する</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
