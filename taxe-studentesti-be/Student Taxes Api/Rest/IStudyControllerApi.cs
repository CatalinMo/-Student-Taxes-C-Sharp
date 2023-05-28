using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;

namespace taxe_studentesti_be.student_taxes_api.rest
{
    public interface IStudyControllerApi
    {
        void CreateStudy(StudyRequestDto request);

        void UpdateStudy(long id, StudyRequestDto request);

        void DeleteStudy(long id);

        void DeleteActiveStudy(long id);

        List<StudyResponseDto> GetStudies();
    }
}
