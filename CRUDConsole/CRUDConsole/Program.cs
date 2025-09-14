// See https://aka.ms/new-console-template for more information
using DataAccessLayer;

Console.WriteLine("Hello, World!");

ProductDAL _productDAL = new ProductDAL();

Console.WriteLine(_productDAL.GetProducts());
