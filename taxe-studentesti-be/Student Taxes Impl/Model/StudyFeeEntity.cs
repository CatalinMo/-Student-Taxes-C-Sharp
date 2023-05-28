using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace taxe_studentesti_be.student_taxes_impl.model
{
    [Table("study_fee")]
    public class StudyFeeEntity
    {
        [Key]
        [Column(name: "STUDY_FEE_ID")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Column(name: "NAME")]
        public string? Name { get; set; }

        [Column(name: "VALUE")]
        public float Value { get; set; }

        [Column(name: "TYPE")]
        public string? Type { get; set; }

        [ForeignKey("STUDY_ID")]
        public virtual StudyEntity? Study { get; set; }
    }
}
