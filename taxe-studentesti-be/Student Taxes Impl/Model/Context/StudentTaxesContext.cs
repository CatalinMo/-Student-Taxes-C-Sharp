using Microsoft.EntityFrameworkCore;

namespace taxe_studentesti_be.student_taxes_impl.model.Context
{
    public class StudentTaxesContext : DbContext
    {
        public StudentTaxesContext(DbContextOptions<StudentTaxesContext> options) : base(options)
        {
        }

        public DbSet<AccountEntity> Accounts { get; set; }
        public DbSet<ActiveFeeEntity> ActiveFees { get; set; }
        public DbSet<ActiveStudyEntity> ActiveStudies { get; set; }
        public DbSet<HostelFeeEntity> HostelFees { get; set; }
        public DbSet<OtherFeeEntity> OtherFees { get; set; }
        public DbSet<PaidFeeEntity> PaidFees { get; set; }
        public DbSet<StudyEntity> Studies { get; set; }
        public DbSet<StudyFeeEntity> StudyFees { get; set; }
    }
}
