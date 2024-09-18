using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeProj.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeProj.Server.DB
{
    public class employee: DbContext
    {
        public enum StateType
        {
            Accepted = 0,
            NeedEnhancement = 1,
            Rejected = 2
        }
        public enum StateOfProgram
        {
            Open = 0,
            Close = 1
        }
        public enum TypeOfEntity
        {
            Employee = 0,
            Supervisor = 1,
            Manager = 2
        }
        protected override void OnConfiguring(DbContextOptionsBuilder ob)
        {
            base.OnConfiguring(ob);

            ob.UseSqlServer("Data Source=192.168.1.150;Initial Catalog=qataremployee;User Id=sa;Password=Magnos0182163958;TrustServerCertificate=True");
        }
        protected override void OnModelCreating(ModelBuilder mb)
        {
            base.OnModelCreating(mb);

            mb.Entity<EmployeeEntity>()
            .HasMany(x => x.DetailsGroup)
            .WithOne(x => x.Writer)
            .HasForeignKey(x => x.WriterID);

            mb.Entity<Details>()
            .HasMany(x => x.LinkedPrograms)
            .WithOne(x => x.Parent)
            .HasForeignKey(x => x.DetailsParent);

            mb.Entity<Details>()
            .HasMany(x => x.SupervisorRequests)
            .WithOne(x => x.OneDetail)
            .HasForeignKey(x => x.DetailID);

            mb.Entity<SupervisorRequest>()
            .HasIndex(x => x.DetailID)
            .IsUnique(false);

            mb.Entity<Details>()
            .HasMany(x => x.EvaluationsGroup)
            .WithOne(x => x.OneDetails)
            .HasForeignKey(x => x.SourceDetails);
        }

        public DbSet<Details> Details {get;set;}
        public DbSet<EmployeeEntity> Employees {get;set;}
        public DbSet<Evaluation> Evaluations {get;set;}
        public DbSet<ProgramEntity> Programs {get;set;}
        public DbSet<SupervisorRequest> SupervisorRequests {get;set;}
        public DbSet<ManagerRequest> ManagerRequests {get;set;}
        public DbSet<Decision> Decisions {get;set;}
    }
}