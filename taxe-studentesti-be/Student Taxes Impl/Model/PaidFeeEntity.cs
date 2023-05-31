using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace taxe_studentesti_be.student_taxes_impl.model
{
    [Table("paid_fee")]
    public class PaidFeeEntity
    {
        [Key]
        [Column(name: "PAID_FEE_ID")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Column(name: "NAME")]
        public string? Name { get; set; }

        [Column(name: "DETAILS")]
        public string? Details { get; set; }

        [Column(name: "COMMENT")]
        public string? Comment { get; set; }

        [Column(name: "DATE_OF_PAYMENT")]
        public DateTime DateOfPayment { get; set; }

        [Column(name: "VALUE")]
        public float Value { get; set; }

        [ForeignKey("ACCOUNT_ID")]
        [JsonIgnore]
        public virtual AccountEntity? Account { get; set; }
    }
}
