using Microsoft.AspNetCore.Mvc;
using taxe_studentesti_be.Security_Api.Domain.Dto;

namespace taxe_studentesti_be.Security_Api
{
    public interface IAuthorizationApi
    {
        TokenWrapperDto GetToken(string authorization);
    }
}
