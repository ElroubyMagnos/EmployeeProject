using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeProj.Server.Models;

namespace EmployeeProj.Server.Connectors
{
    public class ProgramsRequest
    {
        public string Username {get;set;}
        public string Password {get;set;}
        public ProgramEntityRequest[] Programs {get;set;}
    }
}