
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.TaskRequests
{
    public interface ITaskRequestRepository: IRepository<TaskRequest, TaskRequestId>
    {
        Task<List<TaskRequest>> GetAllUnapproved();

        Task<List<TaskRequest>> GetByUser(string user);

        Task<List<TaskRequest>> GetByStatus(Status status);

        Task<List<TaskRequest>> GetByRobot(string robotId);

        Task<List<TaskRequest>> GetApprovedByRobot(string robotId);
    }
}