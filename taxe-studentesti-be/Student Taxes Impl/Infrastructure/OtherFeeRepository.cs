using taxe_studentesti_be.student_taxes_impl.model;
using taxe_studentesti_be.student_taxes_impl.model.Context;

namespace taxe_studentesti_be.Student_Taxes_Impl.Infrastructure
{
    public class OtherFeeRepository
    {
        private readonly StudentTaxesContext _context;

        public OtherFeeRepository(StudentTaxesContext context)
        {
            _context = context;
        }

        public void Save(OtherFeeEntity otherFeeEntity)
        {
            if (otherFeeEntity.Id == 0)
            {
                _context.OtherFees.Add(otherFeeEntity);
            }
            else
            {
                _context.OtherFees.Update(otherFeeEntity);
            }
            _context.SaveChanges();
        }

        public OtherFeeEntity? FindById(long id)
        {
            return _context.OtherFees.FirstOrDefault(fee => fee.Id == id);
        }

        public List<OtherFeeEntity> FindAll()
        {
            return _context.OtherFees.ToList();
        }

        public void DeleteById(long id)
        {
            var entity = _context.OtherFees.FirstOrDefault(fee => fee.Id == id);
            if (entity != null)
            {
                _context.OtherFees.Remove(entity);
                _context.SaveChanges();
            }
        }
    }
}
