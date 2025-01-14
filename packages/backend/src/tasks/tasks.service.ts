import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.prisma.task.create({
      data: {
        name: createTaskDto.name,
      },
    });
  }

  async findAll() {
    return await this.prisma.task.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async done(id: string) {
    return await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        isDone: true,
      },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        name: updateTaskDto.name,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
