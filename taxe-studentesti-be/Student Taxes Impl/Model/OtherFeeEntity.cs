using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace taxe_studentesti_be.student_taxes_impl.model
{
    [Table("other_fees")]
    public class OtherFeeEntity
    {
        [Key]
        [Column(name: "OTHER_FEES_ID")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Column(name: "NAME")]
        public string? Name { get; set; }

        [Column(name: "VALUE")]
        public float Value { get; set; }

        [Column(name: "TYPE")]
        public string? Type { get; set; }
    }
}
