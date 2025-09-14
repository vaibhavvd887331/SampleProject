

using BusinessLayer.Services;

Console.WriteLine("Hello, World!");

ProductBLL productBLL = new ProductBLL();

Console.WriteLine("1. Add Product");
Console.WriteLine("2. Retrieve Product");
Console.WriteLine("3. Updating Product");
Console.WriteLine("4. Deleting Product");
var choice = Console.ReadLine();

switch (choice)
{
    case "1": Console.WriteLine("Adding Product");
        Console.WriteLine("Enter Product Name");
        var productName = Console.ReadLine();
        Console.WriteLine("Enter Price");
        int price = Convert.ToInt32(Console.ReadLine());
        Console.WriteLine("Enter Quantity");
        int quantity = Convert.ToInt32(Console.ReadLine());

        productBLL.AddProductDetails(new DataAccessLayer.Model.Product
        {
            ProductName = productName,
            Price = price,
            Quantity = quantity
        });
        Console.WriteLine("Product Added Successfully");
        break;

            case "2": Console.WriteLine("Retrieving Product....");
            productBLL.GetAllProducts().ForEach(p =>
            {
                Console.WriteLine($"Product Name: {p.ProductName}, Price: {p.Price}, Quantity: {p.Quantity}");
            });
        Console.WriteLine("Product Retrieved Successfully");
        break;

        case "3": Console.WriteLine("Updating Product....");
        Console.WriteLine("Enter Product ID to update:");
        int productId = Convert.ToInt32(Console.ReadLine());
        Console.WriteLine("Enter new Product Name:");
        var newProductName = Console.ReadLine();
        Console.WriteLine("Enter new Price:");
        int newPrice = Convert.ToInt32(Console.ReadLine());
        Console.WriteLine("Enter new Quantity:");
        int qty = Convert.ToInt32(Console.ReadLine());
       int result= productBLL.UpdateProduct(productId, new DataAccessLayer.Model.Product
        {
            ProductName = newProductName,
            Price = newPrice,
            Quantity = qty
        });
        if(result>0)
        {
            Console.WriteLine("Product updated successfully.");
        }
        else
        {
            Console.WriteLine("No product found with the given ID.");
        }
        break;

        case "4": Console.WriteLine("Deleting Product....");
        Console.WriteLine("Enter Product ID to delete:");
        int prodId = Convert.ToInt32(Console.ReadLine());
        
        int resultDelete= productBLL.DeleteProduct(prodId);
        if(resultDelete>0)
        {
            Console.WriteLine("Product deleted successfully.");
        }
        else
        {
            Console.WriteLine("No product found with the given ID.");
        }

        break;
        default:
        Console.WriteLine("Invalid choice. Please select a valid option.");
        break;




}
