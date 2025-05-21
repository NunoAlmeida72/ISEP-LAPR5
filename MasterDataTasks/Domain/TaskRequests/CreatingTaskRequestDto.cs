namespace DDDSample1.Domain.TaskRequests
{
    public class CreatingTaskRequestDto
    {
        public string UserId { get; set; }

        public string TaskId { get; set; }

        public string StartingPoint { get; set; }

        public string EndingPoint { get; set; }

        public string AssignedTo { get; set; }

        public string Name {get; set;}


        public CreatingTaskRequestDto(string userId, string taskId, string startingPoint, string endingPoint, string assignedTo,string name)
        {
            this.UserId = userId;
            this.TaskId = taskId;
            this.StartingPoint = startingPoint;
            this.EndingPoint = endingPoint;
            this.AssignedTo = assignedTo;
            this.Name=name;
        }
    }
}