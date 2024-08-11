'use client';
import { FC, ReactNode } from 'react';
import NotLogin from '@/components/common/NotLogin';
import { useIsSigned } from '@/utils/Auth';

type Props = {
  children: ReactNode;
};

const AuthSwitcher: FC<Props> = ({ children }) => {
  const isSigned = useIsSigned();

  if (isSigned === undefined) {
    return <></>;
  }

  return isSigned ? <>{children}</> : <NotLogin />;
};

export default AuthSwitcher;