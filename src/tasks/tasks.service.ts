import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []
    
    getAllTasks(): Task[] {
        return this.tasks
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id)
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
        this.tasks = this.tasks.filter(task => task.id !== id)
        return this.tasks
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        let task = this.tasks.find(task => task.id === id)
        task.status = status
        return task
    }
}