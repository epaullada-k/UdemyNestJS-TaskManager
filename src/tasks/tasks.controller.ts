import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto)
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.tasksService.createTask(createTaskDto)
        return task
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTaskById(id)
    }

    @Patch(':id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus 
    ): Promise<Task> {
        const updateTaskStatusDto: UpdateTaskStatusDto = {
            id: id,
            status: status,
        }

        return this.tasksService.updateTaskStatus(updateTaskStatusDto)
    }
}
