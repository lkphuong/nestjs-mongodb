import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/common/constants/settings';
import { ACCOUNT_TYPE } from 'src/common/enums/account_type.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ACCOUNT_TYPE[]) =>
  SetMetadata(ROLES_KEY, roles);
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
