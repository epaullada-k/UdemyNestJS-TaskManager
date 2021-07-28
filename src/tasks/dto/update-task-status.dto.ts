import { IsEnum, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../task.model";

export class UpdateTaskStatusDto {
    @IsNotEmpty()
    id: string

    @IsEnum(TaskStatus)
    status: TaskStatus
}