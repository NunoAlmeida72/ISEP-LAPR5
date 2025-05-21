using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.TaskRequests;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.TaskRequests;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace DDDSample1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors();
            


           services.AddDbContext<DDDSample1DbContext>(opt =>
                opt.UseMySql(
                        connectionString: @"server=vs1174.dei.isep.ipp.pt;user=root;password=o5BKPEUxTXIk;database=sem5pi",
                        new MySqlServerVersion(new Version(10, 4, 17)))
                    .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>()
                    .UseLazyLoadingProxies());

            ConfigureMyServices(services);
            

            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseCors( policy  =>policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

/*
            app.Use(async (context, next) =>
            {
            // Perform token validation logic
            string token = context.Request.Headers["Authorization"].ToString().Substring("Bearer ".Length);
            Console.WriteLine(token);
            if (!string.IsNullOrEmpty(token) && JwtValidator.ValidateToken(token, "my sakdfho2390asjod$%jl)!sdjas0i secret"))
            {
                await next();
            }
            else
            {
                // Token is not valid, you may return a 401 Unauthorized response
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Unauthorized");
            }
            });*/

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork,UnitOfWork>();
            services.AddTransient<Adapter>();
            services.AddTransient<ITaskRequestRepository,TaskRequestRepository>();
            services.AddTransient<TaskRequestService>();
        }
    }
}
