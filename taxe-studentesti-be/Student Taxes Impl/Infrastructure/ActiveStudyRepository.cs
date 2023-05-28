using taxe_studentesti_be.student_taxes_impl.model.Context;

namespace taxe_studentesti_be.Student_Taxes_Impl.Infrastructure
{
    public class ActiveStudyRepository
    {
        private readonly StudentTaxesContext _context;

        public ActiveStudyRepository(StudentTaxesContext context)
        {
            _context = context;
        }

        public void DeleteById(long id)
        {
            var activeStudy = _context.ActiveStudies.FirstOrDefault(activeStudy => activeStudy.Id == id);
            if (activeStudy != null)
            {
                _context.ActiveStudies.Remove(activeStudy);
                _context.SaveChanges();
            }
        }
    }
}
