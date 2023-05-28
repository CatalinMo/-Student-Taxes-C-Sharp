using Microsoft.AspNetCore.Mvc;
using taxe_studentesti_be.student_taxes_api.application;
using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;
using taxe_studentesti_be.student_taxes_api.rest;

namespace taxe_studentesti_be.student_taxes_impl.rest
{
    [Controller]
    public class HostelFeeControllerImpl : IHostelFeeControllerApi
    {
        private readonly IHostelFeeServiceApi _hostelFeeService;

        public HostelFeeControllerImpl(IHostelFeeServiceApi hostelFeeService)
        {
            this._hostelFeeService = hostelFeeService;
        }

        [HttpPost("/student-taxes/create-hostel-fee")]
        public void CreateHostelFee([FromBody] HostelFeeRequestDto request)
        {
            _hostelFeeService.CreateHostelFee(request);
        }

        [HttpPut("/student-taxes/hostel-fee/{id}")]
        public void UpdateHostelFee([FromRoute] long id, [FromBody] HostelFeeRequestDto request)
        {
            _hostelFeeService.UpdateHostelFee(id, request);
        }

        [HttpDelete("/student-taxes/hostel-fee/{id}")]
        public void DeleteHostelFee([FromRoute] long id)
        {
            _hostelFeeService.DeleteHostelFee(id);
        }

        [HttpGet("/student-taxes/hostel-fees")]
        public List<HostelFeeResponseDto> GetHostelFees()
        {
            return _hostelFeeService.GetHostelFees();
        }
    }
}
