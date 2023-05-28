using Microsoft.AspNetCore.Mvc;
using taxe_studentesti_be.student_taxes_api.application;
using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;
using taxe_studentesti_be.student_taxes_api.rest;

namespace taxe_studentesti_be.student_taxes_impl.rest
{
    [Controller]
    public class OtherFeeControllerImpl : IOtherFeeControllerApi
    {
        private readonly IOtherFeeServiceApi _otherFeeService;

        public OtherFeeControllerImpl(IOtherFeeServiceApi otherFeeService)
        {
            this._otherFeeService = otherFeeService;
        }

        [HttpPost("/student-taxes/create-other-fee")]
        public void CreateOtherFee([FromBody] OtherFeeRequestDto request)
        {
            _otherFeeService.CreateOtherFee(request);
        }

        [HttpPut("/student-taxes/other-fee/{id}")]
        public void UpdateOtherFee([FromRoute] long id, [FromBody] OtherFeeRequestDto request)
        {
            _otherFeeService.UpdateOtherFee(id, request);
        }

        [HttpDelete("/student-taxes/other-fee/{id}")]
        public void DeleteOtherFee([FromRoute] long id)
        {
            _otherFeeService.DeleteOtherFee(id);
        }

        [HttpGet("/student-taxes/other-fees")]
        public List<OtherFeeResponseDto> GetOtherFees()
        {
            return _otherFeeService.GetOtherFees();
        }
    }
}
