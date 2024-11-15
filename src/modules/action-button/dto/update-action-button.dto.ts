import { PartialType } from '@nestjs/swagger';
import { CreateActionButtonDto } from './create-action-button.dto';

export class UpdateActionButtonDto extends PartialType(CreateActionButtonDto) {}
