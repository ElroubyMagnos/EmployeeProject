using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeProj.Server.Models
{
    public class SupervisorRequest
    {
        public int ID {get;set;}
        public Details OneDetail {get;set;}
        public int DetailID {get;set;}
        public string Title {get;set;}
        public string Description {get;set;}
        public int ToID {get;set;}
        public bool Active {get;set;}
    }
}