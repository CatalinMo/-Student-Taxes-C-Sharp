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
            return _context.ActiveFees.FirstOrDefault(activeFee => activeFee.Id == id);
        }

        public List<ActiveFeeEntity> FindAll()
        {
            return _context.ActiveFees.ToList();
        }

        public void Save(ActiveFeeEntity activeFeeEntity)
        {
            if (activeFeeEntity.Id == 0)
            {
                _context.ActiveFees.Add(activeFeeEntity);
            }
            else
            {
                _context.ActiveFees.Update(activeFeeEntity);
            }
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
