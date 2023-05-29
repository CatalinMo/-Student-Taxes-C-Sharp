using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using taxe_studentesti_be.Security_Impl.Filter;
using Microsoft.Extensions.Options;
using System.Text.Encodings.Web;

namespace taxe_studentesti_be.Security_Impl.Config
{
    public class SecurityHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly AuthorizationFilter _authorizationFilter;

        public SecurityHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock, AuthorizationFilter authorizationFilter)
            : base(options, logger, encoder, clock)
        {
            _authorizationFilter = authorizationFilter;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            var actionContext = new ActionContext(Context, Context.GetRouteData(), new ActionDescriptor());
            var executingContext = new ActionExecutingContext(actionContext, new List<IFilterMetadata>(), new Dictionary<string, object>(), null);
            _authorizationFilter.OnActionExecuting(executingContext);
            var ticket = new AuthenticationTicket(Context.User, Scheme.Name);
            return await Task.FromResult(AuthenticateResult.Success(ticket));
        }
    }
}
