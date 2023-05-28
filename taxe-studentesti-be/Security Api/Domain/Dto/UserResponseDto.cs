namespace taxe_studentesti_be.Security_Api.Domain.Dto
{
    public class UserResponseDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? Cnp { get; set; }
        public string Role { get; set; }
    }
}
