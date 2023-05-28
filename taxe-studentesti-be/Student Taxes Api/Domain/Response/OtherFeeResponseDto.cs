namespace taxe_studentesti_be.student_taxes_api.domain.response
{
    public class OtherFeeResponseDto
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public float Value { get; set; }
        public string? Type { get; set; }
    }
}
