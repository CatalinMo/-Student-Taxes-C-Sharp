using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace taxe_studentesti_be.student_taxes_impl.model
{
    [Table("hostel_fee")]
    public class HostelFeeEntity
    {
        [Key]
        [Column(name: "HOSTEL_FEE_ID")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Column(name: "HOSTEL_NAME")]
        public string? HostelName { get; set; }

        [Column(name: "NAME")]
        public string? Name { get; set; }

        [Column(name: "VALUE")]
        public float Value { get; set; }

        [Column(name: "BUDGET")]
        public bool Budget { get; set; }

        [Column(name: "TYPE")]
        public string? Type { get; set; }
    }
}
