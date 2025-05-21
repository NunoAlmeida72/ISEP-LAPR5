using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.TaskRequests;
using DDDSample1.Infrastructure.TaskRequests;

namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {
        public DbSet<TaskRequest> TaskRequests { get; set; }

        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TaskRequestEntityTypeConfiguration());
        }
    }
}