using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;

namespace taxe_studentesti_be.student_taxes_api.application
{
    public interface IStudyFeeServiceApi
    {
        void UpdateStudy(long id, StudyFeeRequestDto request);
        void DeleteStudyFee(long id);
        List<StudyFeeResponseDto> GetStudyFees();
    }
}
