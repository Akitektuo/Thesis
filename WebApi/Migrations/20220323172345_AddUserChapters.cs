using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    public partial class AddUserChapters : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserChapter_AspNetUsers_UserId",
                table: "UserChapter");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserChapter",
                table: "UserChapter");

            migrationBuilder.RenameTable(
                name: "UserChapter",
                newName: "UserChapters");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserChapters",
                table: "UserChapters",
                columns: new[] { "UserId", "ChapterId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserChapters_AspNetUsers_UserId",
                table: "UserChapters",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserChapters_AspNetUsers_UserId",
                table: "UserChapters");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserChapters",
                table: "UserChapters");

            migrationBuilder.RenameTable(
                name: "UserChapters",
                newName: "UserChapter");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserChapter",
                table: "UserChapter",
                columns: new[] { "UserId", "ChapterId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserChapter_AspNetUsers_UserId",
                table: "UserChapter",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
