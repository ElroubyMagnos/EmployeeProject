using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static EmployeeProj.Server.DB.employee;

namespace EmployeeProj.Server.Models
{
    public class ProgramEntityRequest
    {
        public int ID {get;set;}
        public string Step {get;set;}
        public string Description {get;set;}
        public DateTime StartDate {get;set;}
        public DateTime EndDate {get;set;}
        public double Percentage {get;set;}
        public string State {get;set;}
        public int DetailsParent {get;set;}
    }
}