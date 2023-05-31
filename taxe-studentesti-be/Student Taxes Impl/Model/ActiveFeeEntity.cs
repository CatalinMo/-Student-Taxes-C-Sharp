using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace taxe_studentesti_be.student_taxes_impl.model
{
    [Table("active_fee")]
    public class ActiveFeeEntity
    {
        [Key]
        [Column(name: "ACTIVE_FEE_ID")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Column(name: "NAME")]
        public string? Name { get; set; }

        [Column(name: "DETAILS")]
        public string? Details { get; set; }

        [Column(name: "COMMENT")]
        public string? Comment { get; set; }

        [Column(name: "LIMIT_DATE")]
        public DateTime LimitDate { get; set; }

        [Column(name: "VALUE")]
        public float Value { get; set; }

        [ForeignKey("ACCOUNT_ID")]
        [JsonIgnore]
        public virtual AccountEntity? Account { get; set; }
    }
}
