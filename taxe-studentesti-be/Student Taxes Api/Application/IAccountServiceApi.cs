using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;

namespace taxe_studentesti_be.student_taxes_api.application
{
    public interface IAccountServiceApi
    {
        void CreateAccount(AccountRequestDto request);
        void UpdateAccount(long id, AccountRequestDto request);
        void UpdateActiveFee(long id, ActiveFeeRequestDto request);
        void AssignFeeToAccounts(AssignFeeToAccountRequestDto request);
        void MarkFeeAsPaid(MarkFeeAsPaidRequestDto request);
        void ChangePassword(long id, string newPassword);
        void DeleteAccount(long id);
        void DeleteAccountActiveFee(long id);
        List<AccountResponseDto> GetAccounts();
        AccountResponseDto GetAccountByEmail(string email);
        AccountResponseDto GetAccountByCnp(string cnp);
        List<ActiveFeeResponseDto> GetActiveFees();
        UserIdentityResponseDto GetUserIdentity(string user, string password);
    }
}
