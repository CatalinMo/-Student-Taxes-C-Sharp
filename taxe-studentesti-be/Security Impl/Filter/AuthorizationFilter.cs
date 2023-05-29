using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;
using taxe_studentesti_be.Security_Api.Domain.Dto;
using taxe_studentesti_be.Security_Impl.Application;

namespace taxe_studentesti_be.Security_Impl.Filter
{
    public class AuthorizationFilter : IActionFilter
    {
        private static readonly string BEARER_TOKEN = "Bearer ";
        private readonly JwtTokenProvider _jwtTokenProvider;
        private readonly TokenCacheService _tokenCacheService;

        public AuthorizationFilter(JwtTokenProvider jwtTokenProvider, TokenCacheService tokenCacheService)
        {
            _jwtTokenProvider = jwtTokenProvider;
            _tokenCacheService = tokenCacheService;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            string? token = ExtractToken(context.HttpContext.Request);
            if (token != null)
            {
                FilterJwtToken(context.HttpContext, token);
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        private void FilterJwtToken(HttpContext context, string token)
        {
            if (_tokenCacheService.IsTokenValid(token))
            {
                UserAuthentication auth = _tokenCacheService.GetAuthentication(token);
                AuthenticateTheUser(context, auth);
            }
            else if (_jwtTokenProvider.ValidateToken(token))
            {
                UserAuthentication auth = _jwtTokenProvider.GetAuthentication(token);
                AuthTokenDto authToken = new AuthTokenDto(token, auth);
                _tokenCacheService.AddToken(authToken);
                AuthenticateTheUser(context, auth);
            }
        }

        private void AuthenticateTheUser(HttpContext context, UserAuthentication auth)
        {
            ClaimsIdentity identity = new ClaimsIdentity("Bearer");
            foreach (string authority in auth.Authorities)
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, authority));
            }
            identity.AddClaim(new Claim(ClaimTypes.Name, auth.Name));
            ClaimsPrincipal principal = new ClaimsPrincipal(identity);
            context.User = principal;
        }

        private string? ExtractToken(HttpRequest request)
        {
            string authHeader = request.Headers["Authorization"];
            if (authHeader != null && authHeader.StartsWith(BEARER_TOKEN))
            {
                return authHeader.Replace(BEARER_TOKEN, "");
            }
            return null;
        }
    }
}
