using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeProj.Server.Migrations
{
    /// <inheritdoc />
    public partial class LastTest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WriterID",
                table: "ManagerRequests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WriterID",
                table: "Decisions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ManagerRequests_WriterID",
                table: "ManagerRequests",
                column: "WriterID");

            migrationBuilder.CreateIndex(
                name: "IX_Decisions_WriterID",
                table: "Decisions",
                column: "WriterID");

            migrationBuilder.AddForeignKey(
                name: "FK_Decisions_Employees_WriterID",
                table: "Decisions",
                column: "WriterID",
                principalTable: "Employees",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ManagerRequests_Employees_WriterID",
                table: "ManagerRequests",
                column: "WriterID",
                principalTable: "Employees",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Decisions_Employees_WriterID",
                table: "Decisions");

            migrationBuilder.DropForeignKey(
                name: "FK_ManagerRequests_Employees_WriterID",
                table: "ManagerRequests");

            migrationBuilder.DropIndex(
                name: "IX_ManagerRequests_WriterID",
                table: "ManagerRequests");

            migrationBuilder.DropIndex(
                name: "IX_Decisions_WriterID",
                table: "Decisions");

            migrationBuilder.DropColumn(
                name: "WriterID",
                table: "ManagerRequests");

            migrationBuilder.DropColumn(
                name: "WriterID",
                table: "Decisions");
        }
    }
}
