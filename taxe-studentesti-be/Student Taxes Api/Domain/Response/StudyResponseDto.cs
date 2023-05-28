namespace taxe_studentesti_be.student_taxes_api.domain.response
{
    public class StudyResponseDto
    {
        public long Id { get; set; }
        public string? Faculty { get; set; }
        public string? Cycle { get; set; }
        public string? Department { get; set; }
        public string? StudyProgram { get; set; }
        public string? Form { get; set; }
        public List<StudyFeeResponseDto>? StudyFees { get; set; }
        public int Year { get; set; }
        public string? Abbreviation { get; set; }
    }
}
