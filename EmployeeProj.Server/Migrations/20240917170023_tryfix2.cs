using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeProj.Server.Migrations
{
    /// <inheritdoc />
    public partial class tryfix2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Evaluations_ManagerRequests_ManagerRequestsID",
                table: "Evaluations");

            migrationBuilder.DropIndex(
                name: "IX_Evaluations_ManagerRequestsID",
                table: "Evaluations");

            migrationBuilder.DropColumn(
                name: "ManagerRequestsID",
                table: "Evaluations");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_ManagerID",
                table: "Evaluations",
                column: "ManagerID");

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluations_ManagerRequests_ManagerID",
                table: "Evaluations",
                column: "ManagerID",
                principalTable: "ManagerRequests",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Evaluations_ManagerRequests_ManagerID",
                table: "Evaluations");

            migrationBuilder.DropIndex(
                name: "IX_Evaluations_ManagerID",
                table: "Evaluations");

            migrationBuilder.AddColumn<int>(
                name: "ManagerRequestsID",
                table: "Evaluations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_ManagerRequestsID",
                table: "Evaluations",
                column: "ManagerRequestsID");

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluations_ManagerRequests_ManagerRequestsID",
                table: "Evaluations",
                column: "ManagerRequestsID",
                principalTable: "ManagerRequests",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
