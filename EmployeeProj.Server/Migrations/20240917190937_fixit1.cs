using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeProj.Server.Migrations
{
    /// <inheritdoc />
    public partial class fixit1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Decisions",
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
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NumberOfAccepted = table.Column<double>(type: "float", nullable: false),
                    NumberOfEnhancement = table.Column<double>(type: "float", nullable: false),
                    NumberOfRejected = table.Column<double>(type: "float", nullable: false),
                    CountOf = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Decisions", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Decisions");
        }
    }
}
