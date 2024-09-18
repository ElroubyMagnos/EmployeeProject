using EmployeeProj.Server.Connectors;
using EmployeeProj.Server.DB;
using EmployeeProj.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeProj.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly ILogger<EmployeesController> _logger;

        public EmployeesController(ILogger<EmployeesController> logger)
        {
            _logger = logger;
        }

        [HttpGet("ReturnEmployee/{Username}/{Password}")]
        public async Task<EmployeeEntity> ReturnEmployee(string Username, string Password)
        {
            return await new employee().Employees
            .FirstOrDefaultAsync(x => x.Username == Username && x.Password == Password);
        }

        [HttpPost("SignIn")]
        public async Task<int> SignIn([FromBody] SignInRequest Request)
        {
            var employee = new employee();

            var Emp = await employee.Employees
            .Select(x => new {x.Username, x.Password, x.Type})
            .Where(x => x.Username == Request.Username && x.Password == Request.Password)
            .FirstOrDefaultAsync();

            if (Emp != null)
            {
                return (int)Emp.Type;
            }
            else return 99;
        }
    }
}
