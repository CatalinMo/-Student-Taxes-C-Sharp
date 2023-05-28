using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using taxe_studentesti_be.student_taxes_api.application;
using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;
using taxe_studentesti_be.student_taxes_api.rest;

namespace taxe_studentesti_be.student_taxes_impl.rest
{
    [Controller]
    public class AccountControllerImpl : IAccountControllerApi
    {
        private readonly IAccountServiceApi _accountService;

        public AccountControllerImpl(IAccountServiceApi accountService)
        {
            this._accountService = accountService;
        }

        [HttpPost("/student-taxes/create-account")]
        public void CreateAccount([FromBody] AccountRequestDto request)
        {
            _accountService.CreateAccount(request);
        }

        [HttpPut("/student-taxes/account/{id}")]
        public void UpdateAccount([FromRoute] long id, [FromBody] AccountRequestDto request)
        {
            _accountService.UpdateAccount(id, request);
        }

        [HttpPut("/student-taxes/account/active-fee/{id}")]
        public void UpdateActiveFee([FromRoute] long id, [FromBody] ActiveFeeRequestDto request)
        {
            _accountService.UpdateActiveFee(id, request);
        }

        [HttpPut("/student-taxes/accounts")]
        public void AssignFeeToAccounts([FromBody] AssignFeeToAccountRequestDto request)
        {
            _accountService.AssignFeeToAccounts(request);
        }

        [HttpPut("/student-taxes/account/mark-fee")]
        public void MarkFeeAsPaid([FromBody] MarkFeeAsPaidRequestDto request)
        {
            _accountService.MarkFeeAsPaid(request);
        }

        [HttpPut("/student-taxes/account/{id}/change-password")]
        public void ChangePassword([FromRoute] long id, [FromBody] string newPassword)
        {
            _accountService.ChangePassword(id, newPassword);
        }

        [HttpDelete("/student-taxes/account/{id}")]
        public void DeleteAccount([FromRoute] long id)
        {
            _accountService.DeleteAccount(id);
        }

        [HttpDelete("/student-taxes/account/active-fee/{id}")]
        public void DeleteAccountActiveFee([FromRoute] long id)
        {
            _accountService.DeleteAccountActiveFee(id);
        }

        [HttpGet("/student-taxes/accounts")]
        [Authorize("Admin, Birou Taxe")]
        public List<AccountResponseDto> GetAccounts()
        {
            return _accountService.GetAccounts();
        }

        [HttpGet("/student-taxes/account-email/{email}")]
        public AccountResponseDto GetAccountByEmail([FromRoute] string email)
        {
            return _accountService.GetAccountByEmail(email);
        }

        [HttpGet("/student-taxes/account-cnp/{cnp}")]
        public AccountResponseDto GetAccountByCnp([FromRoute] string cnp)
        {
            return _accountService.GetAccountByCnp(cnp);
        }

        [HttpGet("/student-taxes/accounts/active-fees")]
        public List<ActiveFeeResponseDto> GetActiveFees()
        {
            return _accountService.GetActiveFees();
        }
    }
}
