namespace taxe_studentesti_be.student_taxes_api.domain.request
{
    public class MarkFeeAsPaidRequestDto
    {
        public long AccountId { get; set; }
        public long ActiveFeeId { get; set; }
        public AccountRequestDto? AccountRequest { get; set; }
    }
}
