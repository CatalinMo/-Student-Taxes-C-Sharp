using taxe_studentesti_be.student_taxes_impl.model.Context;
using taxe_studentesti_be.student_taxes_impl.model;
using System.ComponentModel.DataAnnotations.Schema;

namespace taxe_studentesti_be.Student_Taxes_Impl.Infrastructure
{
    public class AccountRepository
    {
        private readonly StudentTaxesContext _context;

        public AccountRepository(StudentTaxesContext context)
        {
            _context = context;
        }

        public AccountEntity? FindByEmail(string? email)
        {
            return _context.Accounts.FirstOrDefault(account => account.Email == email);
        }

        public AccountEntity? FindByCnp(string? cnp)
        {
            if (cnp != null)
            {
                return _context.Accounts.FirstOrDefault(account => account.Cnp == cnp);
            }
            throw new ArgumentException();
        }

        public void Save(AccountEntity accountEntity)
        {
            if (accountEntity.Id == 0)
            {
                _context.Accounts.Add(accountEntity);
            }
            else
            {
                _context.Accounts.Update(accountEntity);
            }
            _context.SaveChanges();
        }

        public AccountEntity? FindById(long id)
        {
            return _context.Accounts.FirstOrDefault(account => account.Id == id);
        }

        public List<AccountEntity> FindAllById(List<long>? ids)
        {
            if (ids != null)
            {
                return _context.Accounts.Where(account => ids.Contains(account.Id))
                    .ToList();
            }
            throw new ArgumentNullException();
        }

        public List<AccountEntity> FindAll()
        {
            return _context.Accounts.ToList();
        }

        public void SaveAll(List<AccountEntity> accountEntities)
        {
            _context.Accounts.UpdateRange(accountEntities);
            _context.SaveChanges();
        }

        public void DeleteById(long id)
        {
            var account = _context.Accounts.FirstOrDefault(account => account.Id == id);
            if (account != null)
            {
                var activeStudies = account.ActiveStudies;
                _context.ActiveStudies.RemoveRange(activeStudies);

                var activeFees = account.ActiveFees;
                _context.ActiveFees.RemoveRange(activeFees);

                var paidFees = account.PaidFees;
                _context.PaidFees.RemoveRange(paidFees);

                _context.Accounts.Remove(account);
                _context.SaveChanges();
            }
        }
    }
}
