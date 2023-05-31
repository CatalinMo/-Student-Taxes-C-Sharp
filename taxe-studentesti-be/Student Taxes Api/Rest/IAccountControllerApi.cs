using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;
using taxe_studentesti_be.Student_Taxes_Api.Domain.Request;

namespace taxe_studentesti_be.student_taxes_api.rest
{
    public interface IAccountControllerApi
    {
        void CreateAccount(AccountRequestDto request);

        void UpdateAccount(long id, AccountRequestDto request);

        void UpdateActiveFee(long id, ActiveFeeRequestDto request);

        void AssignFeeToAccounts(AssignFeeToAccountRequestDto request);

        void MarkFeeAsPaid(MarkFeeAsPaidRequestDto request);

        void ChangePassword(long id, ChangePasswordRequestDto request);

        void DeleteAccount(long id);

        void DeleteAccountActiveFee(long id);

        List<AccountResponseDto> GetAccounts();

        AccountResponseDto GetAccountByEmail(string email);

        AccountResponseDto GetAccountByCnp(string cnp);

        List<ActiveFeeResponseDto> GetActiveFees();
    }
}
