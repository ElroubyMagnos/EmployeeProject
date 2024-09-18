using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeProj.Server.Migrations
{
    /// <inheritdoc />
    public partial class tryfix3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Evaluations_ManagerRequests_ManagerID",
                table: "Evaluations");

            migrationBuilder.RenameColumn(
                name: "ManagerID",
                table: "Evaluations",
                newName: "OneManagerID");

            migrationBuilder.RenameIndex(
                name: "IX_Evaluations_ManagerID",
                table: "Evaluations",
                newName: "IX_Evaluations_OneManagerID");

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluations_ManagerRequests_OneManagerID",
                table: "Evaluations",
                column: "OneManagerID",
                principalTable: "ManagerRequests",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Evaluations_ManagerRequests_OneManagerID",
                table: "Evaluations");

            migrationBuilder.RenameColumn(
                name: "OneManagerID",
                table: "Evaluations",
                newName: "ManagerID");

            migrationBuilder.RenameIndex(
                name: "IX_Evaluations_OneManagerID",
                table: "Evaluations",
                newName: "IX_Evaluations_ManagerID");

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluations_ManagerRequests_ManagerID",
                table: "Evaluations",
                column: "ManagerID",
                principalTable: "ManagerRequests",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
