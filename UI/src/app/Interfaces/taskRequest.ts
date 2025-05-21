export interface TaskRequest {
    id?:string;
    userId?:string;
    taskId?:string;
    status?:string;
    startingPoint?:string;
    endingPoint?:string;
    assignedTo?:string;
    name?:string;
}