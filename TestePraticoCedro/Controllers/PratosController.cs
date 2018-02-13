using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestePraticoCedro.Models;

namespace TestePraticoCedro.Controllers
{
    [Produces("application/json")]
    [Route("api/Pratos")]
    public class PratosController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PratosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Pratos
        [HttpGet]
        public IEnumerable<PratosDTO> Getpratos(string NomePrato)
        {
            if (NomePrato != null)
            {
                return from p in _context.pratos
                       where EF.Functions.Like(p.NomePrato, "%" + NomePrato + "%")
                       select p;
            }
            else
            {
                return _context.pratos.OrderByDescending(x => x.IdRestaurante);
            }
        }

        // GET: api/Pratos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPratos([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pratos = await _context.pratos.SingleOrDefaultAsync(m => m.IdPratos == id);

            if (pratos == null)
            {
                return NotFound();
            }

            return Ok(pratos);
        }

        // PUT: api/Pratos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPratos([FromRoute] int id, [FromBody] PratosDTO pratos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pratos.IdPratos)
            {
                return BadRequest();
            }

            _context.Entry(pratos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PratosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Pratos
        [HttpPost]
        public async Task<IActionResult> PostPratos([FromBody] PratosDTO pratos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (pratos.IdPratos > 0)
            {
                await PutPratos(pratos.IdPratos, pratos);
            }
            else
            {
                _context.pratos.Add(pratos);
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction("GetPratos", new { id = pratos.IdPratos }, pratos);
        }

        // DELETE: api/Pratos/5
        [HttpDelete]
        public async Task<IActionResult> DeletePratos(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pratos = await _context.pratos.SingleOrDefaultAsync(m => m.IdPratos == id);
            if (pratos == null)
            {
                return NotFound();
            }

            _context.pratos.Remove(pratos);
            await _context.SaveChangesAsync();

            return Ok(pratos);
        }

        private bool PratosExists(int id)
        {
            return _context.pratos.Any(e => e.IdPratos == id);
        }
    }
}