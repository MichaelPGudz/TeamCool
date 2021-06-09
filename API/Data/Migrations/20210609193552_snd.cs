using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class snd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Walls_WallId",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Roles_Teams_RoleTeamId",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Roles_RoleTeamId",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "RoleTeamId",
                table: "Roles");

            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "TeamMembers",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "WallId",
                table: "Posts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_TeamMembers_TeamId",
                table: "TeamMembers",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Walls_WallId",
                table: "Posts",
                column: "WallId",
                principalTable: "Walls",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TeamMembers_Teams_TeamId",
                table: "TeamMembers",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Walls_WallId",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_TeamMembers_Teams_TeamId",
                table: "TeamMembers");

            migrationBuilder.DropIndex(
                name: "IX_TeamMembers_TeamId",
                table: "TeamMembers");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "TeamMembers");

            migrationBuilder.AddColumn<int>(
                name: "RoleTeamId",
                table: "Roles",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "WallId",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Roles_RoleTeamId",
                table: "Roles",
                column: "RoleTeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Walls_WallId",
                table: "Posts",
                column: "WallId",
                principalTable: "Walls",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_Teams_RoleTeamId",
                table: "Roles",
                column: "RoleTeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
