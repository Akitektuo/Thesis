﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApi.Exceptions;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BadgesController : ControllerBase
    {
        private readonly IBadgeService badgeService;

        public BadgesController(IBadgeService badgeService)
        {
            this.badgeService = badgeService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBadge(Badge badge)
        {
            ClientException.ValidateModel(ModelState);

            var createdBadge = await badgeService.Create(badge);

            return Ok(createdBadge);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateBadge(Badge badge)
        {
            ClientException.ValidateModel(ModelState);

            var updatedBadge = await badgeService.Update(badge);

            return Ok(updatedBadge);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllBadges()
        {
            var allBadges = await badgeService.GetAll();

            return Ok(allBadges);
        }
    }
}