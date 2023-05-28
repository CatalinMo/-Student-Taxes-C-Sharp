using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using taxe_studentesti_be.student_taxes_api.application;
using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;
using taxe_studentesti_be.student_taxes_api.rest;

namespace taxe_studentesti_be.student_taxes_impl.rest
{
    [Controller]
    public class StudyFeeControllerImpl : IStudyFeeControllerApi
    {
        private readonly IStudyFeeServiceApi _studyFeeService;

        public StudyFeeControllerImpl(IStudyFeeServiceApi studyFeeService)
        {
            this._studyFeeService = studyFeeService;
        }

        [HttpPut("/student-taxes/study-fee/{id}")]
        public void UpdateStudyFee([FromRoute] long id, [FromBody] StudyFeeRequestDto request)
        {
            _studyFeeService.UpdateStudy(id, request);
        }

        [HttpDelete("/student-taxes/study-fee/{id}")]
        public void DeleteStudyFee([FromRoute] long id)
        {
            _studyFeeService.DeleteStudyFee(id);
        }

        [HttpGet("/student-taxes/study-fees")]
        public List<StudyFeeResponseDto> GetStudyFees()
        {
            return _studyFeeService.GetStudyFees();
        }
    }
}
