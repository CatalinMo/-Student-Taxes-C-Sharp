namespace taxe_studentesti_be.student_taxes_api.domain.response
{
    public class AccountResponseDto
    {
        public long Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Cnp { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public List<ActiveStudyResponseDto>? ActiveStudies { get; set; }
        public List<ActiveFeeResponseDto>? ActiveFees { get; set; }
        public List<PaidFeeResponseDto>? PaidFees { get; set; }
    }
}
