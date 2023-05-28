using taxe_studentesti_be.student_taxes_impl.model;
using taxe_studentesti_be.student_taxes_impl.model.Context;

namespace taxe_studentesti_be.Student_Taxes_Impl.Infrastructure
{
    public class HostelFeeRepository
    {
        private readonly StudentTaxesContext _context;

        public HostelFeeRepository(StudentTaxesContext context)
        {
            _context = context;
        }

        public void Save(HostelFeeEntity hostelFeeEntity)
        {
            _context.HostelFees.Add(hostelFeeEntity);
            _context.SaveChanges();
        }

        public HostelFeeEntity? FindById(long id)
        {
            return _context.HostelFees.FirstOrDefault(hostelFee => hostelFee.Id == id);
        }

        public void DeleteById(long id)
        {
            var hostelFeeEntity = _context.HostelFees.FirstOrDefault(hostelFee => hostelFee.Id == id);
            if (hostelFeeEntity != null)
            {
                _context.HostelFees.Remove(hostelFeeEntity);
                _context.SaveChanges();
            }
        }

        public List<HostelFeeEntity> FindAll()
        {
            return _context.HostelFees.ToList();
        }
    }
}
