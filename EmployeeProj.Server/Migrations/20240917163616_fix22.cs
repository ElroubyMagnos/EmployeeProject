using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeProj.Server.Migrations
{
    /// <inheritdoc />
    public partial class fix22 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ManagerRequests",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ToID = table.Column<int>(type: "int", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    EvaluationID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ManagerRequests", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Details",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CoverImage = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    AttachedDoc = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    AttachedName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WaitingForSupervisor = table.Column<bool>(type: "bit", nullable: false),
                    WriterID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Details", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Details_Employees_WriterID",
                        column: x => x.WriterID,
                        principalTable: "Employees",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Evaluations",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Item1 = table.Column<double>(type: "float", nullable: false),
                    Item2 = table.Column<double>(type: "float", nullable: false),
                    Item3 = table.Column<double>(type: "float", nullable: false),
                    Item4 = table.Column<double>(type: "float", nullable: false),
                    Item5 = table.Column<double>(type: "float", nullable: false),
                    Item6 = table.Column<double>(type: "float", nullable: false),
                    Item7 = table.Column<double>(type: "float", nullable: false),
                    StateType = table.Column<int>(type: "int", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WriterID = table.Column<int>(type: "int", nullable: false),
                    SourceDetails = table.Column<int>(type: "int", nullable: false),
                    ManagerID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evaluations", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Evaluations_Employees_WriterID",
                        column: x => x.WriterID,
                        principalTable: "Employees",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Evaluations_ManagerRequests_ManagerID",
                        column: x => x.ManagerID,
                        principalTable: "ManagerRequests",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Programs",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Step = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Percentage = table.Column<double>(type: "float", nullable: false),
                    State = table.Column<int>(type: "int", nullable: false),
                    DetailsParent = table.Column<int>(type: "int", nullable: false),
                    EmployeeEntityID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Programs", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Programs_Details_DetailsParent",
                        column: x => x.DetailsParent,
                        principalTable: "Details",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Programs_Employees_EmployeeEntityID",
                        column: x => x.EmployeeEntityID,
                        principalTable: "Employees",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "SupervisorRequests",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DetailID = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ToID = table.Column<int>(type: "int", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    EmployeeEntityID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupervisorRequests", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SupervisorRequests_Details_DetailID",
                        column: x => x.DetailID,
                        principalTable: "Details",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SupervisorRequests_Employees_EmployeeEntityID",
                        column: x => x.EmployeeEntityID,
                        principalTable: "Employees",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Details_WriterID",
                table: "Details",
                column: "WriterID");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_ManagerID",
                table: "Evaluations",
                column: "ManagerID");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_WriterID",
                table: "Evaluations",
                column: "WriterID");

            migrationBuilder.CreateIndex(
                name: "IX_Programs_DetailsParent",
                table: "Programs",
                column: "DetailsParent");

            migrationBuilder.CreateIndex(
                name: "IX_Programs_EmployeeEntityID",
                table: "Programs",
                column: "EmployeeEntityID");

            migrationBuilder.CreateIndex(
                name: "IX_SupervisorRequests_DetailID",
                table: "SupervisorRequests",
                column: "DetailID");

            migrationBuilder.CreateIndex(
                name: "IX_SupervisorRequests_EmployeeEntityID",
                table: "SupervisorRequests",
                column: "EmployeeEntityID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Evaluations");

            migrationBuilder.DropTable(
                name: "Programs");

            migrationBuilder.DropTable(
                name: "SupervisorRequests");

            migrationBuilder.DropTable(
                name: "ManagerRequests");

            migrationBuilder.DropTable(
                name: "Details");

            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
