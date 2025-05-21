using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;
using Newtonsoft.Json;

namespace DDDSample1.Domain.TaskRequests
{
    public class TaskRequestService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITaskRequestRepository _repo;
        private readonly Adapter _adapter;

        public TaskRequestService(IUnitOfWork unitOfWork, ITaskRequestRepository repo,Adapter adapter)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._adapter=adapter;
        }

        public async Task<List<TaskRequestDto>> GetAllUnapproved()
        {
            var list = await this._repo.GetAllUnapproved();

            if (list.Count == 0)
                return new List<TaskRequestDto>();
            
            List<TaskRequestDto> listDto = list.ConvertAll<TaskRequestDto>(taskRequest => new TaskRequestDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, TaskId = taskRequest.TaskId, Status = taskRequest.Status.ToString(), StartingPoint = taskRequest.StartingPoint, EndingPoint = taskRequest.EndingPoint, AssignedTo = taskRequest.AssignedTo,Name = taskRequest.Name});

            return listDto;
        }

        public async Task<List<TaskRequestDto>> GetAll()
        {
            var list = await this._repo.GetAllAsync();
            if (list.Count == 0)
                return new List<TaskRequestDto>();
            
            List<TaskRequestDto> listDto = list.ConvertAll<TaskRequestDto>(taskRequest => new TaskRequestDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, TaskId = taskRequest.TaskId, Status = taskRequest.Status.ToString(), StartingPoint = taskRequest.StartingPoint, EndingPoint = taskRequest.EndingPoint, AssignedTo = taskRequest.AssignedTo,Name = taskRequest.Name});

            return listDto;
        }

        public async Task<TaskRequestDto> AcceptOrRefuseRequest(string id, bool value,string robotId)
        {
            TaskRequestId requestId = new(id);

            var request = await this._repo.GetByIdAsync(requestId);

            if(value){
                request.UpdateStatus(Status.APPROVED);
                request.AssignedTo=robotId;
            }else{
                request.UpdateStatus(Status.REJECTED);
            }

            await this._unitOfWork.CommitAsync();
            
            return new TaskRequestDto{Id = request.Id.AsGuid(), UserId = request.UserId, TaskId = request.TaskId, Status = request.Status.ToString(), StartingPoint = request.StartingPoint, EndingPoint = request.EndingPoint, AssignedTo = request.AssignedTo,Name = request.Name};
        }

        public async Task<TaskRequestDto> GetById(TaskRequestId id)
        {
            var taskRequest = await this._repo.GetByIdAsync(id);

            if(taskRequest == null)
                return null;

            return new TaskRequestDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, TaskId = taskRequest.TaskId, Status = taskRequest.Status.ToString(), StartingPoint = taskRequest.StartingPoint, EndingPoint = taskRequest.EndingPoint, AssignedTo = taskRequest.AssignedTo,Name = taskRequest.Name};
        }

        public async Task<TaskRequestDto> AddTaskRequest(CreatingTaskRequestDto dto)
        {
            if(dto.UserId==null){
                return null;
            }
            var taskRequest = new TaskRequest(dto.UserId, dto.TaskId, dto.StartingPoint, dto.EndingPoint, dto.AssignedTo,dto.Name);

            await this._repo.AddAsync(taskRequest);

            await this._unitOfWork.CommitAsync();

            return new TaskRequestDto { Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, TaskId = taskRequest.TaskId, Status = taskRequest.Status.ToString(), StartingPoint = taskRequest.StartingPoint, EndingPoint = taskRequest.EndingPoint, AssignedTo = taskRequest.AssignedTo,Name = taskRequest.Name};
        }

        public async Task<List<TaskRequestDto>> GetByRobotType(string id,string token)
        {
            var list = await this._adapter.GetAllRobotsWithRobotTypeId(id,token);

            List<Robot> robots = JsonConvert.DeserializeObject<List<Robot>>(list);

            List<TaskRequestDto> listDto=new List<TaskRequestDto>();

            foreach(var obj in robots){
                Console.WriteLine(obj.Id);
                var list1 = await this._repo.GetByRobot(obj.Id);
                listDto.AddRange(list1.ConvertAll<TaskRequestDto>(taskRequest => new TaskRequestDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, TaskId = taskRequest.TaskId, Status = taskRequest.Status.ToString(), StartingPoint = taskRequest.StartingPoint, EndingPoint = taskRequest.EndingPoint, AssignedTo = taskRequest.AssignedTo,Name = taskRequest.Name}));
            }

            return listDto;
        }

        public async Task<List<TaskRequestDto>> GetByRobot(string id)
        {
            var list = await this._repo.GetByRobot(id);
            
            if (list.Count == 0)
                return new List<TaskRequestDto>();
            
            List<TaskRequestDto> listDto = list.ConvertAll<TaskRequestDto>(taskRequest => new TaskRequestDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, TaskId = taskRequest.TaskId, Status = taskRequest.Status.ToString(), StartingPoint = taskRequest.StartingPoint, EndingPoint = taskRequest.EndingPoint, AssignedTo = taskRequest.AssignedTo,Name = taskRequest.Name});

            return listDto;
        }

        public async Task<List<TaskRequestDto>> GetByUser(string user)
        {
            var list = await this._repo.GetByUser(user);

            if(list.Count ==0)
                return new List<TaskRequestDto>();
            
            List<TaskRequestDto> listDto = list.ConvertAll<TaskRequestDto>(taskRequest => new TaskRequestDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, TaskId = taskRequest.TaskId, Status = taskRequest.Status.ToString(), StartingPoint = taskRequest.StartingPoint, EndingPoint = taskRequest.EndingPoint, AssignedTo = taskRequest.AssignedTo,Name = taskRequest.Name});

            return listDto;
        }

        public async Task<List<TaskRequestDto>> GetByStatus(bool status)
        {
            var list=new List<TaskRequest>();
            if(status){
                 list = await this._repo.GetByStatus(Status.APPROVED);
            }else{
                 list = await this._repo.GetByStatus(Status.REJECTED);
            }

            if(list.Count ==0)
                return new List<TaskRequestDto>();
            
            
            List<TaskRequestDto> listDto = list.ConvertAll<TaskRequestDto>(taskRequest => new TaskRequestDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, TaskId = taskRequest.TaskId, Status = taskRequest.Status.ToString(), StartingPoint = taskRequest.StartingPoint, EndingPoint = taskRequest.EndingPoint, AssignedTo = taskRequest.AssignedTo,Name = taskRequest.Name});

            return listDto;
        }

        public async Task<List<TaskRequestDto>> GetApprovedByRobot(string robotId,string token)
        {
            var list = await this._repo.GetApprovedByRobot(robotId);
            
            if (list.Count == 0)
                return new List<TaskRequestDto>();
            
            List<TaskRequestDto> listDto = list.ConvertAll<TaskRequestDto>(taskRequest => new TaskRequestDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, TaskId = taskRequest.TaskId, Status = taskRequest.Status.ToString(), StartingPoint = taskRequest.StartingPoint, EndingPoint = taskRequest.EndingPoint, AssignedTo = taskRequest.AssignedTo,Name = taskRequest.Name});

            return listDto;
        }

        public async Task<List<TaskRequestDto>> DeleteByUser(string userId){
            var list = await this._repo.GetByUser(userId);
            
            if (list.Count == 0)
                return new List<TaskRequestDto>();

            for(int i=0;i<list.Count;i++){
                list[i].UserId=null;
                list[i].AssignedTo=null;
                list[i].Status=Status.REJECTED;
            }

            await this._unitOfWork.CommitAsync();
            
            List<TaskRequestDto> listDto = list.ConvertAll<TaskRequestDto>(taskRequest => new TaskRequestDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, TaskId = taskRequest.TaskId, Status = taskRequest.Status.ToString(), StartingPoint = taskRequest.StartingPoint, EndingPoint = taskRequest.EndingPoint, AssignedTo = taskRequest.AssignedTo,Name = taskRequest.Name});

            return listDto;
        }
    }
}