import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto)
        }

        return this.tasksService.getAllTasks()
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        const task: Task = this.tasksService.getTaskById(id)
        return task
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        const task: Task = this.tasksService.createTask(createTaskDto)
        return task
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): Task[] {
        const tasks: Task[] = this.tasksService.deleteTaskById(id)
        return tasks
    }

    @Patch(':id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus 
    ): Task {
        const updateTaskStatusDto: UpdateTaskStatusDto = {
            id: id,
            status: status,
        }

        const task: Task = this.tasksService.updateTaskStatus(updateTaskStatusDto)
        return task
    }
}
