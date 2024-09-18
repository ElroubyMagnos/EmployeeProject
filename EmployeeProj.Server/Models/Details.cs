using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeProj.Server.Models
{
    public class Details
    {
        public int ID {get;set;}
        public string Title {get;set;}
        public string Category {get;set;}
        public string Description {get;set;}
        public byte[] CoverImage {get;set;}
        public byte[] AttachedDoc {get;set;}
        public string AttachedName {get;set;}
        public bool WaitingForSupervisor {get;set;}
        public int WriterID {get;set;}
        public EmployeeEntity Writer {get;set;}
        public ICollection<ProgramEntity> LinkedPrograms {get;set;}
        public ICollection<SupervisorRequest> SupervisorRequests {get;set;}
        public ICollection<Evaluation> EvaluationsGroup {get;set;}
    }
}