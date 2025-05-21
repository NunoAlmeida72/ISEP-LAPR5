using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.TaskRequests;
using DDDSample1.Infrastructure.Shared;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.TaskRequests
{
    public class TaskRequestRepository : BaseRepository<TaskRequest, TaskRequestId>, ITaskRequestRepository
    {
        public TaskRequestRepository(DDDSample1DbContext context):base(context.TaskRequests)
        {
        }

        public async Task<List<TaskRequest>> GetAllUnapproved()
        {
            return await _objs.Where(t => t.Status==Status.WAITING).ToListAsync();
        }

        public async Task<List<TaskRequest>> GetAllApproved()
        {
            return await _objs.Where(t => t.Status==Status.APPROVED).ToListAsync();
        }

        public async Task<List<TaskRequest>> GetByUser(string user)
        {
            return await _objs.Where(t => t.UserId.Equals(user)).ToListAsync();
        }

        public async Task<List<TaskRequest>> GetByStatus(Status status)
        {
            return await _objs.Where(t => t.Status.Equals(status)).ToListAsync();
        }

        public async Task<List<TaskRequest>> GetByRobot(string robotId)
        {
            return await _objs.Where(t => t.AssignedTo.Equals(robotId)).ToListAsync();
        }

        public async Task<List<TaskRequest>> GetApprovedByRobot(string robotId)
        {
            return await _objs.Where(t => t.AssignedTo.Equals(robotId)).ToListAsync();
        }

    }
}