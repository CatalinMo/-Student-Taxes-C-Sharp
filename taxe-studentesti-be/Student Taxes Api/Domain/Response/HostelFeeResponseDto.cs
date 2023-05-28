namespace taxe_studentesti_be.student_taxes_api.domain.response
{
    public class HostelFeeResponseDto
    {
        public long Id { get; set; }
        public string? HostelName { get; set; }
        public string? Name { get; set; }
        public float Value { get; set; }
        public bool Budget { get; set; }
        public string? Type { get; set; }
    }
}
