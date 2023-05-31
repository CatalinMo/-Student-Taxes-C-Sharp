using System.Security.Principal;
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
            if (studyEntity.Id == 0)
            {
                _context.Studies.Add(studyEntity);
            }
            else
            {
                _context.Studies.Update(studyEntity);
            }
            _context.SaveChanges();
        }

        public List<StudyEntity> FindAll()
        {
            return _context.Studies.ToList();
        }

        public StudyEntity? FindById(long id)
        {
            return _context.Studies.FirstOrDefault(study => study.Id == id);
        }

        public void DeleteById(long id)
        {
            var study = _context.Studies.FirstOrDefault(study => study.Id == id);
            if (study != null)
            {
                var studyFees = study.StudyFees;
                _context.StudyFees.RemoveRange(studyFees);

                _context.Studies.Remove(study);
                _context.SaveChanges();
            }
        }
    }
}
