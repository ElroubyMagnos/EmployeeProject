using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeProj.Server.Migrations
{
    /// <inheritdoc />
    public partial class tryfix1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EvaluationID",
                table: "ManagerRequests");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EvaluationID",
                table: "ManagerRequests",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
