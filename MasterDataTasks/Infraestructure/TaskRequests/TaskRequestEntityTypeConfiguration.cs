using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.TaskRequests;

namespace DDDSample1.Infrastructure.TaskRequests
{
    internal class TaskRequestEntityTypeConfiguration : IEntityTypeConfiguration<TaskRequest>
    {
        public void Configure(EntityTypeBuilder<TaskRequest> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            //builder.ToTable("Categories", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}