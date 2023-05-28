using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace taxe_studentesti_be.student_taxes_impl.model
{
    [Table("active_study")]
    public class ActiveStudyEntity
    {
        [Key]
        [Column(name: "ACTIVE_STUDY_ID")]
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

        [Column(name: "YEAR")]
        public int Year { get; set; }

        [Column(name: "ABBREVIATION")]
        public string? Abbreviation { get; set; }

        [Column(name: "BUDGET")]
        public bool Budget { get; set; }

        [Column(name: "ACCOMMODATED")]
        public string? Accommodated { get; set; }

        [ForeignKey("ACCOUNT_ID")]
        [JsonIgnore]
        public AccountEntity? Account { get; set; }
    }
}
