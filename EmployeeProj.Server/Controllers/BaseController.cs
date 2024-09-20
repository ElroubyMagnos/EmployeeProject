using EmployeeProj.Server.Connectors;
using EmployeeProj.Server.DB;
using EmployeeProj.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static EmployeeProj.Server.DB.employee;

namespace EmployeeProj.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BaseController : ControllerBase
    {
        private readonly ILogger<BaseController> _logger;

        public BaseController(ILogger<BaseController> logger)
        {
            _logger = logger;
        }

        [HttpPost("SubmitDecision")]
        public async Task<bool> SubmitDecision([FromBody] DecisionRequest Request)
        {
            var employee = new employee();

            await employee.Decisions.AddAsync(new Decision()
            {
                ID = 0,
                CountOf = Request.CountOf,
                Item1 = Request.Item1,
                Item2 = Request.Item2,
                Item3 = Request.Item3,
                Item4 = Request.Item4,
                Item5 = Request.Item5,
                Item6 = Request.Item6,
                Item7 = Request.Item7,
                NumberOfAccepted = Request.NumberOfAccepted,
                NumberOfEnhancement = Request.NumberOfEnhancement,
                NumberOfRejected = Request.NumberOfRejected,
                Remarks = Request.Remarks,
                WriterID = Request.WriterID
            });

            await employee.SaveChangesAsync();

            return true;
        }

        [HttpGet("GetEvaluationsForSummary/{id}")]
        public async Task<Evaluation[]> GetEvaluationsForSummary(int id)
        {
            var employee = new employee();

            var Details = await employee.Details
            .Include(x => x.EvaluationsGroup)
            .FirstOrDefaultAsync(x => x.ID == id);

            if (Details == null)
                return null;


            return Details.EvaluationsGroup.ToArray();
        }

        [HttpGet("CheckForEvaUser/{id}/{Username}/{Password}")]
        public async Task<bool> CheckForEvaUser(int id, string Username, string Password)
        {
            var employee = new employee();

            var Emp = await employee.Employees
            .Select(x => new {x.Username, x.Password, x.ID})
            .FirstOrDefaultAsync(x => x.Username == Username && x.Password == Password);

            if (Emp == null)
                return false;

            var Selected = await employee.Evaluations.Select(x => new {x.ID, x.WriterID, x.SourceDetails})
            .FirstOrDefaultAsync(x => x.SourceDetails == id && x.WriterID == Emp.ID);

            return Selected != null;
        }

        [HttpGet("GetWriterID/{username}/{password}")]
        public async Task<int> GetWritedID(string username, string password)
        {
            return (await new employee().Employees
            .Where(x => x.Username == username && x.Password == password)
            .Select(x => new {x.ID})
            .FirstOrDefaultAsync()).ID;
        }

        [HttpPost("SubmitEvaluation")]
        public async Task<bool> SubmitEvaluation([FromBody] EvaluationRequest Request)
        {
            var employee = new employee();

            await employee.Evaluations.AddAsync(new Evaluation()
            {
                Item1 = Request.Item1,
                Item2 = Request.Item2,
                Item3 = Request.Item3,
                Item4 = Request.Item4,
                Item5 = Request.Item5,
                Item6 = Request.Item6,
                Item7 = Request.Item7,
                Remarks = Request.Remarks,
                SourceDetails = Request.SourceDetails,
                StateType = (StateType)Request.StateType,
                WriterID = Request.WriterID,
                WaitingForManager = true
            });

            await employee.SaveChangesAsync();

            foreach (var manager in await employee.Employees.Where(x => x.Type == TypeOfEntity.Manager).ToArrayAsync())
            {
                await employee.ManagerRequests.AddAsync(new ManagerRequest()
                {
                    Active = true,
                    Description = "A Supervisor Corrected a Program, We need your last decision",
                    Title = "Decision",
                    ToID = manager.ID,
                    DetailsID = Request.SourceDetails,
                    WriterID = Request.WriterID
                });

            }
            await employee.SaveChangesAsync();

            return true;
        }

        [HttpGet("GetProgramsByDetails/{id}")]
        public async Task<List<ProgramEntityRequest>> GetProgramsByDetails(int id)
        {
            List<ProgramEntityRequest> Listof = new List<ProgramEntityRequest>();

            foreach (var emp in (await new employee().Details
            .Include(x => x.LinkedPrograms)
            .Where(x => x.ID == id)
            .FirstOrDefaultAsync()).LinkedPrograms)
            {
                Listof.Add(new ProgramEntityRequest()
                {
                    ID = emp.ID,
                    Description = emp.Description,
                    DetailsParent = emp.DetailsParent,
                    EndDate = emp.EndDate,
                    Percentage = emp.Percentage,
                    StartDate = emp.StartDate,
                    State = emp.State.ToString(),
                    Step = emp.Step,
                });
            }

            return Listof;
        }

        [HttpGet("GetDetailsByID/{id}")]
        public async Task<Details> DetailsExist(int id)
        {
            return await new employee()
            .Details
            .FirstOrDefaultAsync(x => x.ID == id);
        }

        [HttpPost("UnactiveSupervisorNotify")]
        public async Task<bool> UnactiveSupervisorNotify([FromBody] SupervisorRequestRequest Request)
        {
            var employee = new employee();

            employee.SupervisorRequests.Update(new SupervisorRequest()
            {
                ID = Request.ID,
                Active = false,
                Description = Request.Description,
                DetailID = Request.DetailID,
                Title = Request.Title,
                ToID = Request.ToID
            });

            await employee.SaveChangesAsync();

            return true;
        }

        [HttpPost("UnactiveManagerNotify")]
        public async Task<bool> UnactiveManagerNotify([FromBody] ManagerRequestRequest Request)
        {
            var employee = new employee();

            employee.ManagerRequests.Update(new ManagerRequest()
            {
                ID = Request.ID,
                Active = false,
                Description = Request.Description,
                Title = Request.Title,
                ToID = Request.ToID,
                WriterID = Request.WriterID,
                DetailsID = Request.DetailsID
            });

            await employee.SaveChangesAsync();

            return true;
        }

        [HttpGet("GetSupervisorNotify/{Username}/{Password}")]
        public async Task<SupervisorRequest[]> GetSupervisorNotify(string Username, string Password)
        {
            var employee = new employee();

            var Selected = await employee.Employees
            .Select(x => new {x.Username, x.Password, x.ID, x.Type})
            .FirstOrDefaultAsync(x => x.Username == Username && x.Password == Password
            && x.Type == TypeOfEntity.Supervisor);

            if (Selected == null)
            {
                return null;
            }

            var AllNotify = await employee.SupervisorRequests
            .Where(x => x.ToID == Selected.ID && x.Active)
            .ToArrayAsync();

            if (AllNotify == null)
                return null;

            return AllNotify;
        }

        [HttpGet("GetManagerNotify/{Username}/{Password}")]
        public async Task<ManagerRequest[]> GetManagerNotify(string Username, string Password)
        {
            var employee = new employee();

            var Selected = await employee.Employees
            .Select(x => new {x.Username, x.Password, x.ID, x.Type})
            .FirstOrDefaultAsync(x => x.Username == Username && x.Password == Password
            && x.Type == TypeOfEntity.Manager);

            if (Selected == null)
                return null;

            var AllNotify = await employee.ManagerRequests
            .Where(x => x.ToID == Selected.ID && x.Active)
            .ToArrayAsync();

            return AllNotify;
        }

        [HttpPost("AddDetailsWithPrograms")]
        public async Task<bool> AddDetailsWithPrograms([FromBody] ProgramsRequest Request)
        {
            var employee = new employee();

            var Selected = await employee.Employees
            .Select(x => new {x.Username, x.Password, x.ID, x.Type})
            .FirstOrDefaultAsync(x => x.Username == Request.Username && x.Password == Request.Password
            && x.Type == TypeOfEntity.Employee);

            if (Selected == null)
                return false;

            var SelectedDetailsQueue = await employee.Details
            .FirstOrDefaultAsync(x => x.WriterID == Selected.ID && !x.WaitingForSupervisor); 

            if (SelectedDetailsQueue == null)
            {
                return false;
            }

            foreach (var program in Request.Programs)
            {
                program.DetailsParent = SelectedDetailsQueue.ID;

                await employee.Programs.AddAsync(new ProgramEntity()
                {
                    Description = program.Description,
                    DetailsParent = SelectedDetailsQueue.ID,
                    StartDate = program.StartDate,
                    EndDate = program.EndDate,
                    Percentage = program.Percentage,
                    Step = program.Step,
                    State = program.State == "Open" ? StateOfProgram.Open : StateOfProgram.Close,
                    
                });
                
                await employee.SaveChangesAsync();
            }


            SelectedDetailsQueue.WaitingForSupervisor = true;

            employee.Details.Update(SelectedDetailsQueue);

            await employee.SaveChangesAsync();

            foreach (var supervisor in await employee.Employees.Where(x => x.Type == TypeOfEntity.Supervisor).ToArrayAsync())
            {
                await employee.SupervisorRequests.AddAsync(new SupervisorRequest()
                {
                    ID = 0,
                    Active = true,
                    Description = $"A Programs Need your Correction, Added By {Selected.Username}",
                    Title = $"Program Correction",
                    DetailID = SelectedDetailsQueue.ID,
                    ToID = supervisor.ID
                });

            }
            await employee.SaveChangesAsync();

            return true;
        }

        [HttpGet("GetTempDetails/{Username}/{Password}")]
        public async Task<Details> GetTempDetails(string Username, string Password)
        {
            var employee = new employee();

            var Selected = await employee.Employees
            .Select(x => new {x.Username, x.Password, x.ID})
            .FirstOrDefaultAsync(x => x.Username == Username && x.Password == Password);

            if (Selected == null)
                return null;

            var SelectedDetailsQueue = await employee.Details
            .FirstOrDefaultAsync(x => x.WriterID == Selected.ID && !x.WaitingForSupervisor);  

            return SelectedDetailsQueue; 
        }

        [HttpPost("SaveDetailsForQueue")]
        public async Task<bool> SaveDetailsForQueue(IFormCollection Request)
        {
            var FileOfimg = Request.Files.FirstOrDefault(f => f.Name == "Image");
            var FileOfAttach = Request.Files.FirstOrDefault(f => f.Name == "Attach");
            var Title = Request.FirstOrDefault(x => x.Key == "Title").Value.ToString();
            var Category = Request.FirstOrDefault(x => x.Key == "Category").Value.ToString();
            var Description = Request.FirstOrDefault(x => x.Key == "Description").Value.ToString();
            var Required = Request.FirstOrDefault(x => x.Key == "Required").Value.ToString();
            var AttachedName = Request.FirstOrDefault(x => x.Key == "AttachedName").Value.ToString();

            var Username = Request.FirstOrDefault(x => x.Key == "Username").Value.ToString();
            var Password = Request.FirstOrDefault(x => x.Key == "Password").Value.ToString();


            if (Required.ToLower() == "False".ToLower())
            {
                FileOfAttach = null;
            }

            var employee = new employee();

            var GetUser = await employee.Employees
            .FirstOrDefaultAsync(x => x.Username == Username && x.Password == Password && x.Type == employee.TypeOfEntity.Employee);

            if (GetUser == null)
            {
                return false;
            }

            var Selected = await employee.Details.FirstOrDefaultAsync(x => x.Title == Title && !x.WaitingForSupervisor);

            if (Selected != null)
            {
                if (Selected.WriterID != GetUser.ID)
                {
                    return false;
                }

                Selected.AttachedDoc = await SerializeFile(FileOfAttach);
                Selected.CoverImage = await SerializeFile(FileOfimg);
                Selected.Category = Category;
                Selected.Description = Description;
                Selected.AttachedName = AttachedName;

                employee.Details.Update(Selected);
            }
            else
            {
                Selected = new Details()
                {
                    ID = 0,
                    AttachedDoc = await SerializeFile(FileOfAttach),
                    CoverImage = await SerializeFile(FileOfimg),
                    Category = Category,
                    Description = Description,
                    Title = Title,
                    WriterID = GetUser.ID,
                    WaitingForSupervisor = false,
                    AttachedName = AttachedName
                };

                await employee.Details.AddAsync(Selected);
            }

            await employee.SaveChangesAsync();


            return true;
        }

        async Task<byte[]> SerializeFile(IFormFile File)
        {
            var ms = new MemoryStream();

            if (File != null)
                await File.CopyToAsync(ms);

            return ms.ToArray();
        }
    }
}
