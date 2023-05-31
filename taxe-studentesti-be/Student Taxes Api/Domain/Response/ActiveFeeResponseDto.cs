
namespace taxe_studentesti_be.student_taxes_api.domain.response
{
    public class ActiveFeeResponseDto
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? Details { get; set; }
        public string? Comment { get; set; }
        public long LimitDate { get; set; }
        public float Value { get; set; }
        public AccountResponseDto? Account { get; set; }
    }
}
