import { NotFoundException } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { TaskStatus } from "./task-status-enum"
import { TasksRepository } from "./tasks.repository"
import { TasksService } from "./tasks.service"

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn()
})
const mockUser = {
    username: 'User1',
    id: 'someId',
    tasks: [],
    password: 'randomPass$'
}

describe('TasksService', () => {
    let tasksService: TasksService
    let tasksRepository

    beforeEach(async() => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TasksRepository, useFactory: mockTasksRepository }
            ]
        }).compile()

        tasksService = module.get(TasksService)
        tasksRepository = module.get(TasksRepository)
    })
    
    describe('getTasks', () => {
        it('calls TasksRepository.getTasks and returns the result.', async () => {
            //expect(tasksRepository.getTasks).not.toHaveBeenCalled()
            tasksRepository.getTasks.mockResolvedValue('SomeValue')
            const result = await tasksService.getTasks(null, mockUser)
            //expect(tasksRepository.getTasks).toHaveBeenCalled()
            expect(result).toEqual('SomeValue')
        })
    })
    
    describe('getTaskById', () => {
        it('calls TasksRepository.findOne and returns the result.', async () => {
            const mockTask = {
                title: 'SomeTitle',
                description: 'description',
                id: 'SomeId',
                status: TaskStatus.OPEN
            }

            tasksRepository.findOne.mockResolvedValue(mockTask)
            const result = await tasksService.getTaskById('SomeId', mockUser)
            expect(result).toEqual(mockTask)
        })

        it('calls TasksRepository.findOne and handles and error.', async () => {
            tasksRepository.findOne.mockResolvedValue(null)
            expect(tasksService.getTaskById('SomeId', mockUser)).rejects.toThrow(NotFoundException)
        })
    })
})