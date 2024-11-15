import { Injectable } from '@nestjs/common';
import { CreateActionButtonDto } from './dto/create-action-button.dto';
import { UpdateActionButtonDto } from './dto/update-action-button.dto';

@Injectable()
export class ActionButtonService {
  create(createActionButtonDto: CreateActionButtonDto) {
    return 'This action adds a new actionButton';
  }

  findAll() {
    return `This action returns all actionButton`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actionButton`;
  }

  update(id: number, updateActionButtonDto: UpdateActionButtonDto) {
    return `This action updates a #${id} actionButton`;
  }

  remove(id: number) {
    return `This action removes a #${id} actionButton`;
  }
}
