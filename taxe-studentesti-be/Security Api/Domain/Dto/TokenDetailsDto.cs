namespace taxe_studentesti_be.Security_Api.Domain.Dto
{
    public class TokenDetailsDto
    {
        public DateTime ValidUntil { get; set; }
        public UserAuthentication Authentication { get; set; }

        public TokenDetailsDto(DateTime validUntil, UserAuthentication authentication)
        {
            ValidUntil = validUntil;
            Authentication = authentication;
        }
    }
}
