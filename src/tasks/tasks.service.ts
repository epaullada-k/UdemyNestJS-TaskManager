import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []
    
    getAllTasks(): Task[] {
        return this.tasks
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto
        let tasks = this.getAllTasks()
        
        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }

        if (search) {
            tasks = tasks.filter(task => {
                if (task.title.includes(search) || task.description.includes(search)) {
                    return true
                }
                
                return false
            })
        }

        return tasks
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id)

        if (!found) {
            throw new NotFoundException('Task with ID not found')
        }

        return found
    }

    createTask(createTaskDto: CreateTaskDto) {
        const {title, description } = createTaskDto

        const task: Task = {
            id: uuid(),
            title: title,
            description: description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task
    }

    deleteTaskById(id: string): Task[] {
        const found = this.getTaskById(id)
        this.tasks = this.tasks.filter(task => task.id !== found.id)
        return this.tasks
    }

    updateTaskStatus(updateTaskStatusDto: UpdateTaskStatusDto): Task {
        const { id, status } = updateTaskStatusDto
        let task = this.getTaskById(id)
        task.status = status
        return task
    }
}
