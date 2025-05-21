using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.TaskRequests
{
    public class Robot
    {
     
        public string Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public string RobotTypeId { get; set; }

        public string Number { get; set; }
        
        public string Description { get; set; }

        public bool Status { get; set; }

        public Robot()
        {
        }
    }
}