using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestePraticoCedro.Models
{
    [Table("Restaurante")]
    public partial class RestauranteDTO
    {

        [Key]
        public int IdRestaurante { get; set; }

        [Required(ErrorMessage = "Nome do restaurante é obrigatório")]
        [StringLength(80)]
        public string NomeRestaurante { get; set; }

        public virtual ICollection<PratosDTO> Pratos { get; set; }

    }
}
