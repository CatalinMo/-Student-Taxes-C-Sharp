namespace taxe_studentesti_be.Security_Api.Domain.Dto
{
    public class TokenWrapperDto
    {
        public UserResponseDto User { get; set; }
        public string Token { get; set; }

        public TokenWrapperDto(UserResponseDto user, string token)
        {
            User = user;
            Token = token;
        }
    }
}
