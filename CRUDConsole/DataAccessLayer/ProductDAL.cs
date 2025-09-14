using BusinessLayer.Model;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class ProductDAL
    {

        private const string CONNECTION_STRING = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=PracticeDb;Integrated Security=True";

        public ProductDAL() { }

        public List<Product> GetProducts()
        {
            var product = new List<Product>();
            using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("select * from Product", con))
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            product.Add(new Product {
                                ProductName = reader["ProductName"].ToString(),
                                Price = (int?)reader["Price"],
                                Quantity = (int?)reader["Quantity"]

                            });
                        }
                    }
                }            
            }
            return product;
        }
    }
}
