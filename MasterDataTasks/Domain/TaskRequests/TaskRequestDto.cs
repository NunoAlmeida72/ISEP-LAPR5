using System;

namespace DDDSample1.Domain.TaskRequests
{
    public class TaskRequestDto
    {
        public Guid Id { get; set; }

        public string UserId { get; set; }

        public string TaskId { get; set; }

        public string Status { get; set; }

        public string Name { get; set; }

        public string StartingPoint { get; set; }

        public string EndingPoint { get; set; }

        public string AssignedTo { get; set; }
    }
}