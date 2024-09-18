using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static EmployeeProj.Server.DB.employee;

namespace EmployeeProj.Server.Models
{
    public class Decision
    {
        public int ID {get;set;}
        public double Item1 {get;set;}
        public double Item2 {get;set;}
        public double Item3 {get;set;}
        public double Item4 {get;set;}
        public double Item5 {get;set;}
        public double Item6 {get;set;}
        public double Item7 {get;set;}
        public string Remarks {get;set;}
        public double NumberOfAccepted {get;set;}
        public double NumberOfEnhancement {get;set;}
        public double NumberOfRejected {get;set;}
        public double CountOf {get;set;}
    }
}