import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
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
}
