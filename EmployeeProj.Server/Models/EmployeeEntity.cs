using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static EmployeeProj.Server.DB.employee;

namespace EmployeeProj.Server.Models
{
    public class EmployeeEntity
    {
        public int ID {get;set;}
        public string Username {get;set;}
        public string Password {get;set;}
        public TypeOfEntity Type {get;set;}
        public ICollection<Details> DetailsGroup {get;set;}
        public ICollection<ProgramEntity> Programs {get;set;}
        public ICollection<Evaluation> Evaluations {get;set;}
        public ICollection<SupervisorRequest> SupervisorNotify {get;set;}
    }
}