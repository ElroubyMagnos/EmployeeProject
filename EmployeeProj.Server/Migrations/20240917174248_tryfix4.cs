using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeProj.Server.Migrations
{
    /// <inheritdoc />
    public partial class tryfix4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Evaluations_Employees_WriterID",
                table: "Evaluations");

            migrationBuilder.DropForeignKey(
                name: "FK_Evaluations_ManagerRequests_OneManagerID",
                table: "Evaluations");

            migrationBuilder.DropIndex(
                name: "IX_Evaluations_OneManagerID",
                table: "Evaluations");

            migrationBuilder.DropIndex(
                name: "IX_Evaluations_WriterID",
                table: "Evaluations");

            migrationBuilder.DropColumn(
                name: "OneManagerID",
                table: "Evaluations");

            migrationBuilder.AddColumn<int>(
                name: "DetailsID",
                table: "ManagerRequests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeEntityID",
                table: "Evaluations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "WaitingForManager",
                table: "Evaluations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_EmployeeEntityID",
                table: "Evaluations",
                column: "EmployeeEntityID");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_SourceDetails",
                table: "Evaluations",
                column: "SourceDetails");

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluations_Details_SourceDetails",
                table: "Evaluations",
                column: "SourceDetails",
                principalTable: "Details",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluations_Employees_EmployeeEntityID",
                table: "Evaluations",
                column: "EmployeeEntityID",
                principalTable: "Employees",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Evaluations_Details_SourceDetails",
                table: "Evaluations");

            migrationBuilder.DropForeignKey(
                name: "FK_Evaluations_Employees_EmployeeEntityID",
                table: "Evaluations");

            migrationBuilder.DropIndex(
                name: "IX_Evaluations_EmployeeEntityID",
                table: "Evaluations");

            migrationBuilder.DropIndex(
                name: "IX_Evaluations_SourceDetails",
                table: "Evaluations");

            migrationBuilder.DropColumn(
                name: "DetailsID",
                table: "ManagerRequests");

            migrationBuilder.DropColumn(
                name: "EmployeeEntityID",
                table: "Evaluations");

            migrationBuilder.DropColumn(
                name: "WaitingForManager",
                table: "Evaluations");

            migrationBuilder.AddColumn<int>(
                name: "OneManagerID",
                table: "Evaluations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_OneManagerID",
                table: "Evaluations",
                column: "OneManagerID");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_WriterID",
                table: "Evaluations",
                column: "WriterID");

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluations_Employees_WriterID",
                table: "Evaluations",
                column: "WriterID",
                principalTable: "Employees",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluations_ManagerRequests_OneManagerID",
                table: "Evaluations",
                column: "OneManagerID",
                principalTable: "ManagerRequests",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
