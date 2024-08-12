import { PartialType } from '@nestjs/swagger';

import { SignInReqDto } from './req/sign-in.req.dto';

export class UpdateAuthDto extends PartialType(SignInReqDto) {}
