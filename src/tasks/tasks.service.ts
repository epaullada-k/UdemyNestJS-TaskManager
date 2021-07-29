import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,
    ) {}

    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto, user)
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.tasksRepository.findOne({ id, user })

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }

        return found
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user)
    }
    
    async deleteTaskById(id: string, user): Promise<void> {
        const result = await this.tasksRepository.delete({ id, user })
        
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
    }

    async updateTaskStatus(updateTaskStatusDto: UpdateTaskStatusDto, user): Promise<Task> {
        const { id, status } = updateTaskStatusDto
        const task = await this.getTaskById(id, user)
        task.status = status
        this.tasksRepository.save(task)
        return task
    }
}
