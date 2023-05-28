namespace taxe_studentesti_be.student_taxes_api.domain.response
{
    public class UserIdentityResponseDto
    {
        public long Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Cnp { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
    }
}
