using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.TaskRequests
{
    public class TaskRequest : Entity<TaskRequestId>, IAggregateRoot
    {
     
        public string UserId { get; set; }

        public string TaskId { get; set; }

        public Status Status { get; set; }

        public string Name {get;set;}

        public string StartingPoint { get; set; }

        public string EndingPoint { get; set; }

        public string AssignedTo { get; set; }

        public TaskRequest()
        {
        }

        public TaskRequest(string userId, string taskId, string startingPoint, string endingPoint, string assignedTo,string name)
        {
            this.Id = new TaskRequestId(Guid.NewGuid());
            this.UserId = userId;
            this.TaskId = taskId;
            this.Status= Status.WAITING;
            this.StartingPoint = startingPoint;
            this.EndingPoint = endingPoint;
            this.AssignedTo = assignedTo;
            this.Name = name;
        }

        public void UpdateStatus(Status status)
        {
            this.Status = status;
        }
        
    }
}