using AutoMapper;
using taxe_studentesti_be.student_taxes_api.application;
using taxe_studentesti_be.student_taxes_api.domain.request;
using taxe_studentesti_be.student_taxes_api.domain.response;
using taxe_studentesti_be.Student_Taxes_Impl.Config.Properties;
using taxe_studentesti_be.Student_Taxes_Impl.Infrastructure;
using taxe_studentesti_be.student_taxes_impl.model;
using System.Text;
using taxe_studentesti_be.student_taxes_api.exception;
using Microsoft.Extensions.Options;

namespace taxe_studentesti_be.Student_Taxes_Impl.Application
{
    public class AccountService : IAccountServiceApi
    {
        private readonly AccountRepository _accountRepository;
        private readonly ActiveFeeRepository _activeFeeRepository;
        private readonly UserProperties _userProperties;
        private readonly IMapper _mapper;

        public AccountService(
            AccountRepository accountRepository,
            ActiveFeeRepository activeFeeRepository,
            IOptions<UserProperties> userOptions,
            IMapper mapper)
        {
            _accountRepository = accountRepository;
            _activeFeeRepository = activeFeeRepository;
            _userProperties = userOptions.Value;
            _mapper = mapper;
        }

        public void CreateAccount(AccountRequestDto request)
        {
            if (_accountRepository.FindByCnp(request.Cnp) == null)
            {
                AccountEntity accountEntity = _mapper.Map<AccountEntity>(request);
                accountEntity.Password = GetEncodedPassword(_userProperties.DefaultPassword);
                accountEntity.Role = _userProperties.Role;
                _accountRepository.Save(accountEntity);
            }
        }

        public void UpdateAccount(long id, AccountRequestDto request)
        {
            AccountEntity accountEntity = _accountRepository.FindById(id) ?? throw new ArgumentNullException();
            _mapper.Map(request, accountEntity);
            _accountRepository.Save(accountEntity);
        }

        public void UpdateActiveFee(long id, ActiveFeeRequestDto request)
        {
            ActiveFeeEntity activeFeeEntity = _activeFeeRepository.FindById(id) ?? throw new ArgumentNullException();
            _mapper.Map(request, activeFeeEntity);
            _activeFeeRepository.Save(activeFeeEntity);
        }

        public void AssignFeeToAccounts(AssignFeeToAccountRequestDto request)
        {
            List<AccountEntity> accountEntities = _accountRepository.FindAllById(request.Ids);
            ActiveFeeEntity activeFeeEntity = _mapper.Map<ActiveFeeEntity>(request.ActiveFee);
            accountEntities.ForEach(accountEntity => accountEntity.ActiveFees.Add(activeFeeEntity));
            _accountRepository.SaveAll(accountEntities);
        }

        public void MarkFeeAsPaid(MarkFeeAsPaidRequestDto request)
        {
            _activeFeeRepository.DeleteById(request.ActiveFeeId);
            AccountEntity accountEntity = _accountRepository.FindById(request.AccountId) ?? throw new ArgumentNullException();
            _mapper.Map(request.AccountRequest, accountEntity);
            accountEntity.ActiveFees = RemoveActiveFeeEntity(accountEntity.ActiveFees, request.ActiveFeeId);
            _accountRepository.Save(accountEntity);
        }

        public void ChangePassword(long id, string newPassword)
        {
            AccountEntity accountEntity = _accountRepository.FindById(id) ?? throw new ArgumentNullException();
            accountEntity.Password = GetEncodedPassword(newPassword);
            _accountRepository.Save(accountEntity);
        }

        public void DeleteAccount(long id)
        {
            _accountRepository.DeleteById(id);
        }

        public void DeleteAccountActiveFee(long id)
        {
            _activeFeeRepository.DeleteById(id);
        }

        public List<AccountResponseDto> GetAccounts()
        {
            List<AccountEntity> accountEntities = _accountRepository.FindAll();
            return ConvertAccountToDto(accountEntities);
        }

        public AccountResponseDto GetAccountByEmail(string email)
        {
            AccountEntity accountEntity = _accountRepository.FindByEmail(email) ?? throw new ArgumentNullException();
            return ConvertAccount(accountEntity);
        }

        public AccountResponseDto GetAccountByCnp(string cnp)
        {
            AccountEntity accountEntity = _accountRepository.FindByCnp(cnp) ?? throw new ArgumentNullException();
            return ConvertAccount(accountEntity);
        }

        public List<ActiveFeeResponseDto> GetActiveFees()
        {
            List<ActiveFeeEntity> activeFeeEntities = _activeFeeRepository.FindAll();
            return ConvertActiveFeeToDto(activeFeeEntities);
        }

        public UserIdentityResponseDto GetUserIdentity(string user, string password)
        {
            if (_accountRepository.FindByCnp(user) != null)
            {
                AccountEntity accountEntity = _accountRepository.FindByCnp(user) ?? throw new ArgumentNullException();
                return CheckUserAndReturn(accountEntity, password);
            }
            else if (_accountRepository.FindByEmail(user) != null
                    && _accountRepository.FindByEmail(user)?.Cnp == null)
            {
                AccountEntity accountEntity = _accountRepository.FindByEmail(user) ?? throw new ArgumentNullException();
                return CheckUserAndReturn(accountEntity, password);
            }
            throw new BadUserException("Utilizator greșit");
        }

        private string GetEncodedPassword(string password)
        {
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(password));
        }

        private string GetDecodedPassword(string encodedPassword)
        {
            byte[] data = Convert.FromBase64String(encodedPassword);
            return Encoding.UTF8.GetString(data);
        }

        private HashSet<ActiveFeeEntity> RemoveActiveFeeEntity(HashSet<ActiveFeeEntity> activeFeeEntities, long paidFeeId)
        {
            return activeFeeEntities.Where(activeFeeEntity => !activeFeeEntity.Id.Equals(paidFeeId))
                                    .ToHashSet();
        }

        private List<AccountResponseDto> ConvertAccountToDto(List<AccountEntity> accountEntities)
        {
            return accountEntities.Select(ConvertAccount)
                                  .ToList();
        }

        private List<ActiveFeeResponseDto> ConvertActiveFeeToDto(List<ActiveFeeEntity> activeFeeEntities)
        {
            return activeFeeEntities.Select(ConvertActiveFee)
                                    .ToList();
        }

        private UserIdentityResponseDto CheckUserAndReturn(AccountEntity accountEntity, string password)
        {
            if (password.Equals(GetDecodedPassword(accountEntity.Password)))
            {
                return _mapper.Map<UserIdentityResponseDto>(accountEntity);
            }
            throw new BadUserException("Utilizator greșit");
        }

        private AccountResponseDto ConvertAccount(AccountEntity accountEntity)
        {
            return new AccountResponseDto
            {
                Id = accountEntity.Id,
                FirstName = accountEntity.FirstName,
                LastName = accountEntity.LastName,
                Cnp = accountEntity.Cnp,
                Email = accountEntity.Email,
                Phone = accountEntity.Phone,
                ActiveStudies = accountEntity.ActiveStudies?.Select(ConvertToDto).ToList(),
                ActiveFees = accountEntity.ActiveFees?.Select(ConvertToDto).ToList(),
                PaidFees = accountEntity.PaidFees?.Select(ConvertToDto).ToList(),
            };
        }

        private ActiveFeeResponseDto ConvertActiveFee(ActiveFeeEntity activeFeeEntity)
        {
            return new ActiveFeeResponseDto
            {
                Id = activeFeeEntity.Id,
                Name = activeFeeEntity.Name,
                Details = activeFeeEntity.Details,
                Comment = activeFeeEntity.Comment,
                LimitDate = activeFeeEntity.LimitDate,
                Value = activeFeeEntity.Value,
                Account = ConvertAccount(activeFeeEntity.Account),
            };
        }

        private ActiveStudyResponseDto ConvertToDto(ActiveStudyEntity request)
        {
            return _mapper.Map<ActiveStudyResponseDto>(request);
        }

        private ActiveFeeResponseDto ConvertToDto(ActiveFeeEntity request)
        {
            return _mapper.Map<ActiveFeeResponseDto>(request);
        }

        private PaidFeeResponseDto ConvertToDto(PaidFeeEntity request)
        {
            return _mapper.Map<PaidFeeResponseDto>(request);
        }
    }
 }
