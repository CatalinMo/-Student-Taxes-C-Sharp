using Microsoft.AspNetCore.Mvc;
using taxe_studentesti_be.Security_Api.Domain.Dto;
using taxe_studentesti_be.Security_Api.exception;
using taxe_studentesti_be.Security_Api;
using taxe_studentesti_be.Security_Impl.Application;
using Microsoft.AspNetCore.Authorization;

namespace taxe_studentesti_be.Security_Impl.Presentation
{
    public class AuthorizationController : IAuthorizationApi
    {
        private readonly AuthorizationService _authorizationService;

        public AuthorizationController(AuthorizationService authorizationService)
        {
            _authorizationService = authorizationService;
        }

        [AllowAnonymous]
        [HttpGet("/auth/token")]
        public TokenWrapperDto GetToken([FromHeader(Name = "Authorization")] string authorization)
        {
            if (authorization != null && authorization.StartsWith("Basic "))
            {
                return _authorizationService.VerifyCredentials(authorization);
            }
            throw new MissingAuthorizationException("Nu sunteți autorizat să accesați resursele");
        }
    }
}
