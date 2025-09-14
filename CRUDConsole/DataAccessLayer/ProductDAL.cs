
using DataAccessLayer.Model;
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
                            product.Add(new Product
                            {
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


        public void AddProduct(Product product)
        {
            using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("insert into Product values(@ProductName, @Price, @Quantity)", con))
                {
                    cmd.Parameters.AddWithValue("@ProductName", product.ProductName);
                    cmd.Parameters.AddWithValue("@Price", product.Price);
                    cmd.Parameters.AddWithValue("@Quantity", product.Quantity);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public int UpdateProduct(int productId, Product product)
        {
            int result = 0;
            using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("update Product set Price=@Price, Quantity=@Quantity , ProductName=@ProductName where ProductId = " + productId, con))
                {
                    cmd.Parameters.AddWithValue("@ProductName", product.ProductName);
                    cmd.Parameters.AddWithValue("@Price", product.Price);
                    cmd.Parameters.AddWithValue("@Quantity", product.Quantity);
                    result = cmd.ExecuteNonQuery();
                }
            }
            return result;
        }

        public int DeleteProduct(int productId)
        {
            int result = 0;
            using (SqlConnection con = new SqlConnection(CONNECTION_STRING))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("delete from Product where ProductId = " + productId, con))
                {

                    result = cmd.ExecuteNonQuery();
                }
            }
            return result;
        }
    }
}
