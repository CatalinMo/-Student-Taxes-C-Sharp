using System.Text;
using taxe_studentesti_be.Security_Api.Domain.Dto;
using taxe_studentesti_be.Security_Api.exception;
using taxe_studentesti_be.student_taxes_api.application;
using taxe_studentesti_be.student_taxes_api.domain.response;

namespace taxe_studentesti_be.Security_Impl.Application
{
    public class AuthorizationService
    {
        private readonly IAccountServiceApi _accountService;
        private readonly JwtTokenProvider _tokenProvider;

        public AuthorizationService(IAccountServiceApi accountService, JwtTokenProvider tokenProvider)
        {
            _accountService = accountService;
            _tokenProvider = tokenProvider;
        }

        public TokenWrapperDto VerifyCredentials(string authorization)
        {
            string credentials = ExtractCredentials(authorization);
            string[] values = credentials.Split(':', 2);
            UserIdentityResponseDto user = _accountService.GetUserIdentity(values[0], values[1]);
            if (user != null)
            {
                return GetAuthorizationToken(user);
            }
            throw new AuthenticationFailException("Credențialele sunt invalide");
        }

        private TokenWrapperDto GetAuthorizationToken(UserIdentityResponseDto user)
        {
            List<string> authorities = _tokenProvider.AddGrantedAuthorities(user.Role);
            UserAuthentication authentication = new UserAuthentication(authorities, user.Email, true);
            string token = _tokenProvider.CreateToken(authentication);
            return new TokenWrapperDto(ConvertToUserResponse(user), token);
        }

        private UserResponseDto ConvertToUserResponse(UserIdentityResponseDto user)
        {
            UserResponseDto responseDto = new UserResponseDto();
            responseDto.Email = user.Email;
            responseDto.Cnp = user.Cnp;
            responseDto.FirstName = user.FirstName;
            responseDto.LastName = user.LastName;
            responseDto.Role = user.Role;
            return responseDto;
        }

        private string ExtractCredentials(string authorization)
        {
            string base64Credentials = authorization.Substring("Basic ".Length).Trim();
            byte[] credDecoded = Convert.FromBase64String(base64Credentials);
            return Encoding.UTF8.GetString(credDecoded);
        }
    }
}
