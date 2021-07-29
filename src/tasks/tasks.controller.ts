import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { Getuser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(
        @Query() filterDto: GetTasksFilterDto,
        @Getuser() user: User
    ): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto, user)
    }

    @Get('/:id')
    getTaskById(
        @Param('id') id: string,
        @Getuser() user: User
    ): Promise<Task> {
        return this.tasksService.getTaskById(id, user)
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @Getuser() user: User
    ): Promise<Task> {
        const task = this.tasksService.createTask(createTaskDto, user)
        return task
    }

    @Delete('/:id')
    deleteTaskById(
        @Param('id') id: string,
        @Getuser() user: User
    ): Promise<void> {
        return this.tasksService.deleteTaskById(id, user)
    }

    @Patch(':id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus ,
        @Getuser() user: User
    ): Promise<Task> {
        const updateTaskStatusDto: UpdateTaskStatusDto = {
            id: id,
            status: status,
        }

        return this.tasksService.updateTaskStatus(updateTaskStatusDto, user)
    }
}
