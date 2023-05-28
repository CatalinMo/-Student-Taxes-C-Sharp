using Microsoft.EntityFrameworkCore;
using taxe_studentesti_be.student_taxes_impl.model;
using taxe_studentesti_be.student_taxes_impl.model.Context;

namespace taxe_studentesti_be.Student_Taxes_Impl.Infrastructure
{
    public class StudyRepository
    {
        private readonly StudentTaxesContext _context;

        public StudyRepository(StudentTaxesContext context)
        {
            _context = context;
        }

        public void Save(StudyEntity studyEntity)
        {
            _context.Studies.Add(studyEntity);
            _context.SaveChanges();
        }

        public List<StudyEntity> FindAll()
        {
            return _context.Studies.Include(study => study.StudyFees).ToList();
        }

        public StudyEntity? FindById(long id)
        {
            return _context.Studies.Include(study => study.StudyFees)
                .FirstOrDefault(study => study.Id == id);
        }

        public void DeleteById(long id)
        {
            var study = _context.Studies.FirstOrDefault(study => study.Id == id);
            if (study != null)
            {
                _context.Studies.Remove(study);
                _context.SaveChanges();
            }
        }
    }
}
