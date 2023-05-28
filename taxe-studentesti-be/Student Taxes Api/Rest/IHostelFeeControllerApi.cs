using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;

namespace taxe_studentesti_be.student_taxes_api.rest
{
    public interface IHostelFeeControllerApi
    {
        void CreateHostelFee(HostelFeeRequestDto request);

        void UpdateHostelFee(long id, HostelFeeRequestDto request);

        void DeleteHostelFee(long id);

        List<HostelFeeResponseDto> GetHostelFees();
    }
}
