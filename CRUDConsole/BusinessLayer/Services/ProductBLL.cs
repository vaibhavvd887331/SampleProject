
using DataAccessLayer;
using DataAccessLayer.Model;




namespace BusinessLayer.Services
{
    public class ProductBLL
    {

        private readonly ProductDAL productDAL;

        public ProductBLL()
        {
            productDAL = new ProductDAL();
        }


        public void AddProductDetails(Product product)
        {
            productDAL.AddProduct(product);
        }


        public List<Product> GetAllProducts()
        {
            return productDAL.GetProducts();
        }

        public int UpdateProduct(int productId, Product product)
        {
            int rowsAffected = productDAL.UpdateProduct(productId, product);
            return rowsAffected;
        }

        public int DeleteProduct(int productId) {
                        int rowsAffected = productDAL.DeleteProduct(productId);
            return rowsAffected;

        }




    }
}
