namespace taxe_studentesti_be.student_taxes_api.domain.request
{
    public class AccountRequestDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Cnp { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public List<ActiveStudyRequestDto>? ActiveStudies { get; set; }
        public List<ActiveFeeRequestDto>? ActiveFees { get; set; }
        public List<PaidFeeRequestDto>? PaidFees { get; set; }
    }
}
