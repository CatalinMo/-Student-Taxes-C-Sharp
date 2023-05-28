using Microsoft.AspNetCore.Mvc;
using taxe_studentesti_be.student_taxes_api.application;
using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;
using taxe_studentesti_be.student_taxes_api.rest;

namespace taxe_studentesti_be.student_taxes_impl.rest
{
    [Controller]
    public class StudyControllerImpl : IStudyControllerApi
    {
        private readonly IStudyServiceApi _studyService;

        public StudyControllerImpl(IStudyServiceApi studyService)
        {
            this._studyService = studyService;
        }

        [HttpPost("/student-taxes/create-study")]
        public void CreateStudy([FromBody] StudyRequestDto request)
        {
            _studyService.CreateStudy(request);
        }

        [HttpPut("/student-taxes/study/{id}")]
        public void UpdateStudy([FromRoute] long id, [FromBody] StudyRequestDto request)
        {
            _studyService.UpdateStudy(id, request);
        }

        [HttpDelete("/student-taxes/study/{id}")]
        public void DeleteStudy([FromRoute] long id)
        {
            _studyService.DeleteStudy(id);
        }

        [HttpDelete("/student-taxes/active-study/{id}")]
        public void DeleteActiveStudy([FromRoute] long id)
        {
            _studyService.DeleteActiveStudy(id);
        }

        [HttpGet("/student-taxes/studies")]
        public List<StudyResponseDto> GetStudies()
        {
            return _studyService.GetStudies();
        }
    }
}
