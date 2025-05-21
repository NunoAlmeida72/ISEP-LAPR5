using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.TaskRequests;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class TaskRequestController : ControllerBase
    {
        private readonly TaskRequestService _service;

        public TaskRequestController(TaskRequestService service)
        {
            _service = service;
        }

        // GET: api/TaskRequest/id
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskRequestDto>> GetById(Guid id)
        {
            var taskRequest = await _service.GetById(new TaskRequestId(id));

            if (taskRequest == null)
            {
                return NotFound();
            }

            return taskRequest;
        }

        // POST: api/TaskRequest
        [HttpPost]
        public async Task<ActionResult<TaskRequestDto>> Create(CreatingTaskRequestDto dto)
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Substring("Bearer ".Length);

            if (!string.IsNullOrEmpty(token) && JwtValidator.ValidateToken(token, "my sakdfho2390asjod$%jl)!sdjas0i secret"))
            {
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

                if (jsonToken != null)
                {
                    var userId = jsonToken.Claims.First(claim => claim.Type == "id").Value;

                    dto.UserId=userId;
                }
                else
                {
                    return BadRequest("Invalid token.");
                }
                
            }

            var cat = await _service.AddTaskRequest(dto);

            return CreatedAtAction(nameof(GetById), new { id = cat.Id }, cat);
        }

        // GET: api/TaskRequest/approved/robotId
        [HttpGet("approved/{robotTypeId}")]
        public async Task<List<TaskRequestDto>> GetApprovedByRobot(string robotId)
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Substring("Bearer ".Length);
            if (string.IsNullOrEmpty(token))
            {
                return null;
            }
            return await _service.GetApprovedByRobot(robotId,token);
        }

        // GET: api/TaskRequest/unapproved
        [HttpGet("unapproved")]
        public async Task<List<TaskRequestDto>> GetAllUnapproved()
        {
            return await _service.GetAllUnapproved();
        }

        [HttpGet]
        public async Task<List<TaskRequestDto>> GetAll()
        {
            return await _service.GetAll();
        }

        // PATCH: api/TaskRequest/id/value
        [HttpPatch("{id}/{value}/{robotId}")]
        public async Task<TaskRequestDto> AcceptRequest(string id, bool value,string robotId)
        {
            return await _service.AcceptOrRefuseRequest(id, value,robotId);
        }

        [HttpPatch("{id}/{value}")]
        public async Task<TaskRequestDto> RefuseRequest(string id, bool value)
        {
            return await _service.AcceptOrRefuseRequest(id, value,"");
        }

        // GET: api/TaskRequest
        [HttpGet("robotType/{id}")]
        public async Task<List<TaskRequestDto>> GetByRobotType(string id)
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Substring("Bearer ".Length);
            if (string.IsNullOrEmpty(token))
            {
                return null;
            }
            return await _service.GetByRobotType(id,token);
        }

        [HttpGet("status/{status}")]
        public async Task<List<TaskRequestDto>> GetByStatus(bool status)
        {
            return await _service.GetByStatus(status);
        }

        [HttpGet("user/{userId}")]
        public async Task<List<TaskRequestDto>> GetByUser(string userId)
        {
            return await _service.GetByUser(userId);
        }

        [HttpGet("by-robot/{id}")]
        public async Task<List<TaskRequestDto>> GetByRobot(string id)
        {
            return await _service.GetByRobot(id);
        }

        [HttpDelete("delete/user/tasks")]
        public async Task<List<TaskRequestDto>> DeleteByUser()
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Substring("Bearer ".Length);
            string userId="";

            if (!string.IsNullOrEmpty(token) && JwtValidator.ValidateToken(token, "my sakdfho2390asjod$%jl)!sdjas0i secret"))
            {
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

                if (jsonToken != null)
                {
                    userId = jsonToken.Claims.First(claim => claim.Type == "id").Value;

                }
                else
                {
                    return null;
                }
                
            }
            return await _service.DeleteByUser(userId);
        }
    }
}