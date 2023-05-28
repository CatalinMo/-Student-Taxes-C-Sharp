using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace taxe_studentesti_be.student_taxes_impl.model
{
    [Table("study")]
    public class StudyEntity
    {
        [Key]
        [Column(name: "STUDY_ID")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Column(name: "FACULTY")]
        public string? Faculty { get; set; }

        [Column(name: "CYCLE")]
        public string? Cycle { get; set; }

        [Column(name: "DEPARTMENT")]
        public string? Department { get; set; }

        [Column(name: "STUDY_PROGRAM")]
        public string? StudyProgram { get; set; }

        [Column(name: "FORM")]
        public string? Form { get; set; }

        public virtual HashSet<StudyFeeEntity>? StudyFees { get; set; }

        [Column(name: "YEAR")]
        public int Year { get; set; }

        [Column(name: "ABBREVIATION")]
        public string? Abbreviation { get; set; }
    }
}
