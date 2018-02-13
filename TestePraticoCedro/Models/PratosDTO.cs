using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestePraticoCedro.Models
{
    [Table("Pratos")]
    public partial class PratosDTO
    {

        [Key]
        public int IdPratos { get; set; }

        [ForeignKey("Restaurante")]
        [Required]
        public int IdRestaurante { get; set; }

        [Required(ErrorMessage = "Nome do prato é obrigatório")]
        [StringLength(80)]
        public string NomePrato { get; set; }
    }
}
