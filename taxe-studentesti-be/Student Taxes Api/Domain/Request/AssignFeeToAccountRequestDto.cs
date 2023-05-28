namespace taxe_studentesti_be.student_taxes_api.domain.request
{
    public class AssignFeeToAccountRequestDto
    {
        public List<long>? Ids { get; set; }
        public ActiveFeeRequestDto? ActiveFee { get; set; }
    }
}
