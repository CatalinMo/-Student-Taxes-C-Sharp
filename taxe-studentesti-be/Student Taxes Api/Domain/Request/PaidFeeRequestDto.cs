
namespace taxe_studentesti_be.student_taxes_api.domain.request
{
    public class PaidFeeRequestDto
    {
        public string? Name { get; set; }
        public string? Details { get; set; }
        public string? Comment { get; set; }
        public long DateOfPayment { get; set; }
        public float Value { get; set; }
    }
}
