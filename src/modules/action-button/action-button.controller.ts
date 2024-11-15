import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActionButtonService } from './action-button.service';
import { CreateActionButtonDto } from './dto/create-action-button.dto';
import { UpdateActionButtonDto } from './dto/update-action-button.dto';

@Controller('action-button')
export class ActionButtonController {
  constructor(private readonly actionButtonService: ActionButtonService) {}

  @Post()
  create(@Body() createActionButtonDto: CreateActionButtonDto) {
    return this.actionButtonService.create(createActionButtonDto);
  }

  @Get()
  findAll() {
    return this.actionButtonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionButtonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActionButtonDto: UpdateActionButtonDto) {
    return this.actionButtonService.update(+id, updateActionButtonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionButtonService.remove(+id);
  }
}
