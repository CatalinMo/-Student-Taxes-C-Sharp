using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace taxe_studentesti_be.student_taxes_impl.model
{
    [Table("account")]
    public class AccountEntity
    {
        [Key]
        [Column("ACCOUNT_ID")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Column("FIRST_NAME")]
        public string? FirstName { get; set; }

        [Column("LAST_NAME")]
        public string? LastName { get; set; }

        [Column("CNP")]
        public string? Cnp { get; set; }

        [Column("EMAIL")]
        public string? Email { get; set; }

        [Column("PHONE")]
        public string? Phone { get; set; }

        [Column("PASSWORD")]
        public string? Password { get; set; }

        [Column("ROLE")]
        public string? Role { get; set; }

        public virtual HashSet<ActiveStudyEntity>? ActiveStudies { get; set; }

        public virtual HashSet<ActiveFeeEntity>? ActiveFees { get; set; }

        public virtual HashSet<PaidFeeEntity>? PaidFees { get; set; }
    }
}
