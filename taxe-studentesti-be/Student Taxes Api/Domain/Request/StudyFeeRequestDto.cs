namespace taxe_studentesti_be.student_taxes_api.domain.request
{
    public class StudyFeeRequestDto
    {
        public string? Name { get; set; }
        public float Value { get; set; }
        public string? Type { get; set; }
    }
}
