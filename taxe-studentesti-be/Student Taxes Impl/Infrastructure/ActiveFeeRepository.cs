using Microsoft.EntityFrameworkCore;
using taxe_studentesti_be.student_taxes_impl.model;
using taxe_studentesti_be.student_taxes_impl.model.Context;

namespace taxe_studentesti_be.Student_Taxes_Impl.Infrastructure
{
    public class ActiveFeeRepository
    {
        private readonly StudentTaxesContext _context;

        public ActiveFeeRepository(StudentTaxesContext context)
        {
            _context = context;
        }

        public ActiveFeeEntity? FindById(long id)
        {
            return _context.ActiveFees.Include(activeFee => activeFee.Account)
                .FirstOrDefault(activeFee => activeFee.Id == id);
        }

        public List<ActiveFeeEntity> FindAll()
        {
            return _context.ActiveFees.Include(activeFee => activeFee.Account).ToList();
        }

        public void Save(ActiveFeeEntity activeFeeEntity)
        {
            _context.ActiveFees.Add(activeFeeEntity);
            _context.SaveChanges();
        }

        public void DeleteById(long activeFeeId)
        {
            var activeFeeEntity = _context.ActiveFees.FirstOrDefault(activeFee => activeFee.Id == activeFeeId);
            if (activeFeeEntity != null)
            {
                _context.ActiveFees.Remove(activeFeeEntity);
                _context.SaveChanges();
            }
        }
    }
}
