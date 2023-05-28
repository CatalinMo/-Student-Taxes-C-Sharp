namespace taxe_studentesti_be.Security_Api.Domain.Dto
{
    public class AuthTokenDto
    {
        public string Token { get; set; }
        public UserAuthentication Authentication { get; set; }

        public AuthTokenDto(string token, UserAuthentication authentication)
        {
            Token = token;
            Authentication = authentication;
        }
    }
}
