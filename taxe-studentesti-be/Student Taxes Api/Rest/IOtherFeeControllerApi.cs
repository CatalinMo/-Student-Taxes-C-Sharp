using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;

namespace taxe_studentesti_be.student_taxes_api.rest
{
    public interface IOtherFeeControllerApi
    {
        void CreateOtherFee(OtherFeeRequestDto request);

        void UpdateOtherFee(long id, OtherFeeRequestDto request);

        void DeleteOtherFee(long id);

        List<OtherFeeResponseDto> GetOtherFees();
    }
}
