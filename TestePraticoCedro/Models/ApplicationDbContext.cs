using Microsoft.EntityFrameworkCore;

namespace TestePraticoCedro.Models
{

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<RestauranteDTO> restaurante { get; set; }
        public virtual DbSet<PratosDTO> pratos { get; set; }

        protected override void OnModelCreating(ModelBuilder Builder)
        {
            base.OnModelCreating(Builder);
            
        }
    }
}
