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
    deleteTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.deleteTaskById(id)
    }

    // @Get()
    // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.tasksService.getTasksWithFilters(filterDto)
    //     }

    //     return this.tasksService.getAllTasks()
    // }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     const task: Task = this.tasksService.getTaskById(id)
    //     return task
    // }

    // @Post()
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //     const task: Task = this.tasksService.createTask(createTaskDto)
    //     return task
    // }

    // @Delete('/:id')
    // deleteTaskById(@Param('id') id: string): Task[] {
    //     const tasks: Task[] = this.tasksService.deleteTaskById(id)
    //     return tasks
    // }

    // @Patch(':id/status')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body('status') status: TaskStatus 
    // ): Task {
    //     const updateTaskStatusDto: UpdateTaskStatusDto = {
    //         id: id,
    //         status: status,
    //     }

    //     const task: Task = this.tasksService.updateTaskStatus(updateTaskStatusDto)
    //     return task
    // }
}
