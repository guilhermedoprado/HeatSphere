using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HeatSphere.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddBriefDefinition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BriefDefinition",
                table: "notes",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BriefDefinition",
                table: "notes");
        }
    }
}
