using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Moq;
using NUnit.Framework;
using System;
using System.Threading.Tasks;
using WebApi.Context;
using WebApi.Exceptions;
using WebApi.Models;
using WebApi.Services;

namespace UnitTests.Services;

public class BadgeServiceTests
{
    [Test]
    public void Create_UserIsNotAdmin_ThrowsClientException()
    {
        // Arrange
        var sut = CreateService();

        // Act
        var createCall = sut.Create(new());

        // Assert
        Assert.ThrowsAsync<ClientException>(async () => await createCall);
    }

    [Test]
    public async Task Create_UserIsAdmin_BadgeIsAdded()
    {
        // Arrange
        var sut = CreateService(true);
        var badge = new Badge
        {
            Name = "Some name",
            Image = "https://some.image",
            Points = 50
        };

        // Act
        var createdBadge = await sut.Create(badge);

        // Assert
        Assert.AreEqual(badge, createdBadge);
    }

    private IBadgeService CreateService(bool isUserAdmin = false)
    {
        var dataContext = CreateDataContext();

        var userServiceMock = new Mock<IUserService>();
        var userServiceFlow = userServiceMock.Setup(service => service.EnsureCurrentIsAdmin());

        if (isUserAdmin)
            userServiceFlow.Returns(Task.CompletedTask);
        else
            userServiceFlow.ThrowsAsync(new ClientException("Forbidden"));

        return new BadgeService(dataContext, userServiceMock.Object);
    }

    private DataContext CreateDataContext()
    {
        var options = new DbContextOptionsBuilder<DataContext>()
                 .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                 .ConfigureWarnings(warnings => warnings.Ignore(InMemoryEventId.TransactionIgnoredWarning))
                 .Options;

        return new DataContext(options);
    }
}
