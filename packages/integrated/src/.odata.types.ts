/*
* This code was GENERATED using the vite plugin odata-codegen.
* It contains TypeScript type definitions for OData services.
* Do not modify this file manually as it will be overwritten on the next build.
* For any changes, update the OData service definitions or plugin configuration.
*/

/* eslint-disable */
/* prettier-ignore */

import { OData, type TOdataDummyInterface, type TODataOptions } from "notsapodata"


/**
 * Fields and Keys as Constants
 * 
 * Model: northwindModel
 */
export const northwindModelConsts = {
  "NorthwindModel": {
    "Category": {
      fields: ["CategoryID", "CategoryName", "Description", "Picture"] as const,
      keys: ["CategoryID"] as const,
      measures: [] as const,
    },
    "CustomerDemographic": {
      fields: ["CustomerTypeID", "CustomerDesc"] as const,
      keys: ["CustomerTypeID"] as const,
      measures: [] as const,
    },
    "Customer": {
      fields: ["CustomerID", "CompanyName", "ContactName", "ContactTitle", "Address", "City", "Region", "PostalCode", "Country", "Phone", "Fax"] as const,
      keys: ["CustomerID"] as const,
      measures: [] as const,
    },
    "Employee": {
      fields: ["EmployeeID", "LastName", "FirstName", "Title", "TitleOfCourtesy", "BirthDate", "HireDate", "Address", "City", "Region", "PostalCode", "Country", "HomePhone", "Extension", "Photo", "Notes", "ReportsTo", "PhotoPath"] as const,
      keys: ["EmployeeID"] as const,
      measures: [] as const,
    },
    "Order_Detail": {
      fields: ["OrderID", "ProductID", "UnitPrice", "Quantity", "Discount"] as const,
      keys: ["OrderID", "ProductID"] as const,
      measures: [] as const,
    },
    "Order": {
      fields: ["OrderID", "CustomerID", "EmployeeID", "OrderDate", "RequiredDate", "ShippedDate", "ShipVia", "Freight", "ShipName", "ShipAddress", "ShipCity", "ShipRegion", "ShipPostalCode", "ShipCountry"] as const,
      keys: ["OrderID"] as const,
      measures: [] as const,
    },
    "Product": {
      fields: ["ProductID", "ProductName", "SupplierID", "CategoryID", "QuantityPerUnit", "UnitPrice", "UnitsInStock", "UnitsOnOrder", "ReorderLevel", "Discontinued"] as const,
      keys: ["ProductID"] as const,
      measures: [] as const,
    },
    "Region": {
      fields: ["RegionID", "RegionDescription"] as const,
      keys: ["RegionID"] as const,
      measures: [] as const,
    },
    "Shipper": {
      fields: ["ShipperID", "CompanyName", "Phone"] as const,
      keys: ["ShipperID"] as const,
      measures: [] as const,
    },
    "Supplier": {
      fields: ["SupplierID", "CompanyName", "ContactName", "ContactTitle", "Address", "City", "Region", "PostalCode", "Country", "Phone", "Fax", "HomePage"] as const,
      keys: ["SupplierID"] as const,
      measures: [] as const,
    },
    "Territory": {
      fields: ["TerritoryID", "TerritoryDescription", "RegionID"] as const,
      keys: ["TerritoryID"] as const,
      measures: [] as const,
    },
    "Alphabetical_list_of_product": {
      fields: ["ProductID", "ProductName", "SupplierID", "CategoryID", "QuantityPerUnit", "UnitPrice", "UnitsInStock", "UnitsOnOrder", "ReorderLevel", "Discontinued", "CategoryName"] as const,
      keys: ["CategoryName", "Discontinued", "ProductID", "ProductName"] as const,
      measures: [] as const,
    },
    "Category_Sales_for_1997": {
      fields: ["CategoryName", "CategorySales"] as const,
      keys: ["CategoryName"] as const,
      measures: [] as const,
    },
    "Current_Product_List": {
      fields: ["ProductID", "ProductName"] as const,
      keys: ["ProductID", "ProductName"] as const,
      measures: [] as const,
    },
    "Customer_and_Suppliers_by_City": {
      fields: ["City", "CompanyName", "ContactName", "Relationship"] as const,
      keys: ["CompanyName", "Relationship"] as const,
      measures: [] as const,
    },
    "Invoice": {
      fields: ["ShipName", "ShipAddress", "ShipCity", "ShipRegion", "ShipPostalCode", "ShipCountry", "CustomerID", "CustomerName", "Address", "City", "Region", "PostalCode", "Country", "Salesperson", "OrderID", "OrderDate", "RequiredDate", "ShippedDate", "ShipperName", "ProductID", "ProductName", "UnitPrice", "Quantity", "Discount", "ExtendedPrice", "Freight"] as const,
      keys: ["CustomerName", "Discount", "OrderID", "ProductID", "ProductName", "Quantity", "Salesperson", "ShipperName", "UnitPrice"] as const,
      measures: [] as const,
    },
    "Order_Details_Extended": {
      fields: ["OrderID", "ProductID", "ProductName", "UnitPrice", "Quantity", "Discount", "ExtendedPrice"] as const,
      keys: ["Discount", "OrderID", "ProductID", "ProductName", "Quantity", "UnitPrice"] as const,
      measures: [] as const,
    },
    "Order_Subtotal": {
      fields: ["OrderID", "Subtotal"] as const,
      keys: ["OrderID"] as const,
      measures: [] as const,
    },
    "Orders_Qry": {
      fields: ["OrderID", "CustomerID", "EmployeeID", "OrderDate", "RequiredDate", "ShippedDate", "ShipVia", "Freight", "ShipName", "ShipAddress", "ShipCity", "ShipRegion", "ShipPostalCode", "ShipCountry", "CompanyName", "Address", "City", "Region", "PostalCode", "Country"] as const,
      keys: ["CompanyName", "OrderID"] as const,
      measures: [] as const,
    },
    "Product_Sales_for_1997": {
      fields: ["CategoryName", "ProductName", "ProductSales"] as const,
      keys: ["CategoryName", "ProductName"] as const,
      measures: [] as const,
    },
    "Products_Above_Average_Price": {
      fields: ["ProductName", "UnitPrice"] as const,
      keys: ["ProductName"] as const,
      measures: [] as const,
    },
    "Products_by_Category": {
      fields: ["CategoryName", "ProductName", "QuantityPerUnit", "UnitsInStock", "Discontinued"] as const,
      keys: ["CategoryName", "Discontinued", "ProductName"] as const,
      measures: [] as const,
    },
    "Sales_by_Category": {
      fields: ["CategoryID", "CategoryName", "ProductName", "ProductSales"] as const,
      keys: ["CategoryID", "CategoryName", "ProductName"] as const,
      measures: [] as const,
    },
    "Sales_Totals_by_Amount": {
      fields: ["SaleAmount", "OrderID", "CompanyName", "ShippedDate"] as const,
      keys: ["CompanyName", "OrderID"] as const,
      measures: [] as const,
    },
    "Summary_of_Sales_by_Quarter": {
      fields: ["ShippedDate", "OrderID", "Subtotal"] as const,
      keys: ["OrderID"] as const,
      measures: [] as const,
    },
    "Summary_of_Sales_by_Year": {
      fields: ["ShippedDate", "OrderID", "Subtotal"] as const,
      keys: ["OrderID"] as const,
      measures: [] as const,
    },
  },
};

/**
 * Types for Keys and Fields
 * 
 * Model: northwindModel
 */
export interface TNorthwindModel {
  "NorthwindModel": {
    "Category": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Category"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Category"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Category"]["measures"][number];
    };
    "CustomerDemographic": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["CustomerDemographic"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["CustomerDemographic"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["CustomerDemographic"]["measures"][number];
    };
    "Customer": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Customer"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Customer"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Customer"]["measures"][number];
    };
    "Employee": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Employee"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Employee"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Employee"]["measures"][number];
    };
    "Order_Detail": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Order_Detail"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Order_Detail"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Order_Detail"]["measures"][number];
    };
    "Order": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Order"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Order"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Order"]["measures"][number];
    };
    "Product": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Product"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Product"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Product"]["measures"][number];
    };
    "Region": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Region"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Region"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Region"]["measures"][number];
    };
    "Shipper": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Shipper"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Shipper"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Shipper"]["measures"][number];
    };
    "Supplier": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Supplier"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Supplier"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Supplier"]["measures"][number];
    };
    "Territory": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Territory"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Territory"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Territory"]["measures"][number];
    };
    "Alphabetical_list_of_product": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Alphabetical_list_of_product"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Alphabetical_list_of_product"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Alphabetical_list_of_product"]["measures"][number];
    };
    "Category_Sales_for_1997": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Category_Sales_for_1997"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Category_Sales_for_1997"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Category_Sales_for_1997"]["measures"][number];
    };
    "Current_Product_List": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Current_Product_List"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Current_Product_List"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Current_Product_List"]["measures"][number];
    };
    "Customer_and_Suppliers_by_City": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Customer_and_Suppliers_by_City"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Customer_and_Suppliers_by_City"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Customer_and_Suppliers_by_City"]["measures"][number];
    };
    "Invoice": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Invoice"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Invoice"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Invoice"]["measures"][number];
    };
    "Order_Details_Extended": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Order_Details_Extended"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Order_Details_Extended"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Order_Details_Extended"]["measures"][number];
    };
    "Order_Subtotal": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Order_Subtotal"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Order_Subtotal"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Order_Subtotal"]["measures"][number];
    };
    "Orders_Qry": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Orders_Qry"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Orders_Qry"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Orders_Qry"]["measures"][number];
    };
    "Product_Sales_for_1997": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Product_Sales_for_1997"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Product_Sales_for_1997"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Product_Sales_for_1997"]["measures"][number];
    };
    "Products_Above_Average_Price": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Products_Above_Average_Price"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Products_Above_Average_Price"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Products_Above_Average_Price"]["measures"][number];
    };
    "Products_by_Category": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Products_by_Category"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Products_by_Category"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Products_by_Category"]["measures"][number];
    };
    "Sales_by_Category": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Sales_by_Category"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Sales_by_Category"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Sales_by_Category"]["measures"][number];
    };
    "Sales_Totals_by_Amount": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Sales_Totals_by_Amount"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Sales_Totals_by_Amount"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Sales_Totals_by_Amount"]["measures"][number];
    };
    "Summary_of_Sales_by_Quarter": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Summary_of_Sales_by_Quarter"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Summary_of_Sales_by_Quarter"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Summary_of_Sales_by_Quarter"]["measures"][number];
    };
    "Summary_of_Sales_by_Year": {
      fields: (typeof northwindModelConsts)["NorthwindModel"]["Summary_of_Sales_by_Year"]["fields"][number];
      keys: (typeof northwindModelConsts)["NorthwindModel"]["Summary_of_Sales_by_Year"]["keys"][number];
      measures: (typeof northwindModelConsts)["NorthwindModel"]["Summary_of_Sales_by_Year"]["measures"][number];
    };
  };
}

/**
 * Main OData Interface
 * 
 * Model: northwindModel
 */
export interface TNorthwindModelOData extends TOdataDummyInterface {
  entitySets: {
    'Categories': "NorthwindModel.Category";
    'CustomerDemographics': "NorthwindModel.CustomerDemographic";
    'Customers': "NorthwindModel.Customer";
    'Employees': "NorthwindModel.Employee";
    'Order_Details': "NorthwindModel.Order_Detail";
    'Orders': "NorthwindModel.Order";
    'Products': "NorthwindModel.Product";
    'Regions': "NorthwindModel.Region";
    'Shippers': "NorthwindModel.Shipper";
    'Suppliers': "NorthwindModel.Supplier";
    'Territories': "NorthwindModel.Territory";
    'Alphabetical_list_of_products': "NorthwindModel.Alphabetical_list_of_product";
    'Category_Sales_for_1997': "NorthwindModel.Category_Sales_for_1997";
    'Current_Product_Lists': "NorthwindModel.Current_Product_List";
    'Customer_and_Suppliers_by_Cities': "NorthwindModel.Customer_and_Suppliers_by_City";
    'Invoices': "NorthwindModel.Invoice";
    'Order_Details_Extendeds': "NorthwindModel.Order_Details_Extended";
    'Order_Subtotals': "NorthwindModel.Order_Subtotal";
    'Orders_Qries': "NorthwindModel.Orders_Qry";
    'Product_Sales_for_1997': "NorthwindModel.Product_Sales_for_1997";
    'Products_Above_Average_Prices': "NorthwindModel.Products_Above_Average_Price";
    'Products_by_Categories': "NorthwindModel.Products_by_Category";
    'Sales_by_Categories': "NorthwindModel.Sales_by_Category";
    'Sales_Totals_by_Amounts': "NorthwindModel.Sales_Totals_by_Amount";
    'Summary_of_Sales_by_Quarters': "NorthwindModel.Summary_of_Sales_by_Quarter";
    'Summary_of_Sales_by_Years': "NorthwindModel.Summary_of_Sales_by_Year";
  };
  entityTypes: {
    'NorthwindModel.Category': {
      keys: TNorthwindModel["NorthwindModel"]["Category"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Category"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Category"]["measures"];
      navToMany: {
        Products: "NorthwindModel.Product";
      };
      navToOne: {};
      record: {
        CategoryID: number;
        CategoryName: string;
        Description?: string;
        Picture?: string;
        Products?: { results: Array<TNorthwindModelOData['entityTypes']['NorthwindModel.Product']['record']> };
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.CustomerDemographic': {
      keys: TNorthwindModel["NorthwindModel"]["CustomerDemographic"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["CustomerDemographic"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["CustomerDemographic"]["measures"];
      navToMany: {
        Customers: "NorthwindModel.Customer";
      };
      navToOne: {};
      record: {
        CustomerTypeID: string;
        CustomerDesc?: string;
        Customers?: { results: Array<TNorthwindModelOData['entityTypes']['NorthwindModel.Customer']['record']> };
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Customer': {
      keys: TNorthwindModel["NorthwindModel"]["Customer"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Customer"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Customer"]["measures"];
      navToMany: {
        Orders: "NorthwindModel.Order";
        CustomerDemographics: "NorthwindModel.CustomerDemographic";
      };
      navToOne: {};
      record: {
        CustomerID: string;
        CompanyName: string;
        ContactName?: string;
        ContactTitle?: string;
        Address?: string;
        City?: string;
        Region?: string;
        PostalCode?: string;
        Country?: string;
        Phone?: string;
        Fax?: string;
        Orders?: { results: Array<TNorthwindModelOData['entityTypes']['NorthwindModel.Order']['record']> };
        CustomerDemographics?: { results: Array<TNorthwindModelOData['entityTypes']['NorthwindModel.CustomerDemographic']['record']> };
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Employee': {
      keys: TNorthwindModel["NorthwindModel"]["Employee"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Employee"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Employee"]["measures"];
      navToMany: {
        Employees1: "NorthwindModel.Employee";
        Orders: "NorthwindModel.Order";
        Territories: "NorthwindModel.Territory";
      };
      navToOne: {
        Employee1: "NorthwindModel.Employee";
      };
      record: {
        EmployeeID: number;
        LastName: string;
        FirstName: string;
        Title?: string;
        TitleOfCourtesy?: string;
        BirthDate?: string;
        HireDate?: string;
        Address?: string;
        City?: string;
        Region?: string;
        PostalCode?: string;
        Country?: string;
        HomePhone?: string;
        Extension?: string;
        Photo?: string;
        Notes?: string;
        ReportsTo?: number;
        PhotoPath?: string;
        Employees1?: { results: Array<TNorthwindModelOData['entityTypes']['NorthwindModel.Employee']['record']> };
        Employee1?: TNorthwindModelOData['entityTypes']['NorthwindModel.Employee']['record'] | null;
        Orders?: { results: Array<TNorthwindModelOData['entityTypes']['NorthwindModel.Order']['record']> };
        Territories?: { results: Array<TNorthwindModelOData['entityTypes']['NorthwindModel.Territory']['record']> };
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Order_Detail': {
      keys: TNorthwindModel["NorthwindModel"]["Order_Detail"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Order_Detail"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Order_Detail"]["measures"];
      navToMany: {};
      navToOne: {
        Order: "NorthwindModel.Order";
        Product: "NorthwindModel.Product";
      };
      record: {
        OrderID: number;
        ProductID: number;
        UnitPrice: number;
        Quantity: number;
        Discount: number;
        Order?: TNorthwindModelOData['entityTypes']['NorthwindModel.Order']['record'] | null;
        Product?: TNorthwindModelOData['entityTypes']['NorthwindModel.Product']['record'] | null;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Order': {
      keys: TNorthwindModel["NorthwindModel"]["Order"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Order"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Order"]["measures"];
      navToMany: {
        Order_Details: "NorthwindModel.Order_Detail";
      };
      navToOne: {
        Customer: "NorthwindModel.Customer";
        Employee: "NorthwindModel.Employee";
        Shipper: "NorthwindModel.Shipper";
      };
      record: {
        OrderID: number;
        CustomerID?: string;
        EmployeeID?: number;
        OrderDate?: string;
        RequiredDate?: string;
        ShippedDate?: string;
        ShipVia?: number;
        Freight?: number;
        ShipName?: string;
        ShipAddress?: string;
        ShipCity?: string;
        ShipRegion?: string;
        ShipPostalCode?: string;
        ShipCountry?: string;
        Customer?: TNorthwindModelOData['entityTypes']['NorthwindModel.Customer']['record'] | null;
        Employee?: TNorthwindModelOData['entityTypes']['NorthwindModel.Employee']['record'] | null;
        Order_Details?: { results: Array<TNorthwindModelOData['entityTypes']['NorthwindModel.Order_Detail']['record']> };
        Shipper?: TNorthwindModelOData['entityTypes']['NorthwindModel.Shipper']['record'] | null;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Product': {
      keys: TNorthwindModel["NorthwindModel"]["Product"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Product"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Product"]["measures"];
      navToMany: {
        Order_Details: "NorthwindModel.Order_Detail";
      };
      navToOne: {
        Category: "NorthwindModel.Category";
        Supplier: "NorthwindModel.Supplier";
      };
      record: {
        ProductID: number;
        ProductName: string;
        SupplierID?: number;
        CategoryID?: number;
        QuantityPerUnit?: string;
        UnitPrice?: number;
        UnitsInStock?: number;
        UnitsOnOrder?: number;
        ReorderLevel?: number;
        Discontinued: boolean;
        Category?: TNorthwindModelOData['entityTypes']['NorthwindModel.Category']['record'] | null;
        Order_Details?: { results: Array<TNorthwindModelOData['entityTypes']['NorthwindModel.Order_Detail']['record']> };
        Supplier?: TNorthwindModelOData['entityTypes']['NorthwindModel.Supplier']['record'] | null;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Region': {
      keys: TNorthwindModel["NorthwindModel"]["Region"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Region"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Region"]["measures"];
      navToMany: {
        Territories: "NorthwindModel.Territory";
      };
      navToOne: {};
      record: {
        RegionID: number;
        RegionDescription: string;
        Territories?: { results: Array<TNorthwindModelOData['entityTypes']['NorthwindModel.Territory']['record']> };
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Shipper': {
      keys: TNorthwindModel["NorthwindModel"]["Shipper"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Shipper"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Shipper"]["measures"];
      navToMany: {
        Orders: "NorthwindModel.Order";
      };
      navToOne: {};
      record: {
        ShipperID: number;
        CompanyName: string;
        Phone?: string;
        Orders?: { results: Array<TNorthwindModelOData['entityTypes']['NorthwindModel.Order']['record']> };
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Supplier': {
      keys: TNorthwindModel["NorthwindModel"]["Supplier"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Supplier"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Supplier"]["measures"];
      navToMany: {
        Products: "NorthwindModel.Product";
      };
      navToOne: {};
      record: {
        SupplierID: number;
        CompanyName: string;
        ContactName?: string;
        ContactTitle?: string;
        Address?: string;
        City?: string;
        Region?: string;
        PostalCode?: string;
        Country?: string;
        Phone?: string;
        Fax?: string;
        HomePage?: string;
        Products?: { results: Array<TNorthwindModelOData['entityTypes']['NorthwindModel.Product']['record']> };
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Territory': {
      keys: TNorthwindModel["NorthwindModel"]["Territory"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Territory"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Territory"]["measures"];
      navToMany: {
        Employees: "NorthwindModel.Employee";
      };
      navToOne: {
        Region: "NorthwindModel.Region";
      };
      record: {
        TerritoryID: string;
        TerritoryDescription: string;
        RegionID: number;
        Region?: TNorthwindModelOData['entityTypes']['NorthwindModel.Region']['record'] | null;
        Employees?: { results: Array<TNorthwindModelOData['entityTypes']['NorthwindModel.Employee']['record']> };
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Alphabetical_list_of_product': {
      keys: TNorthwindModel["NorthwindModel"]["Alphabetical_list_of_product"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Alphabetical_list_of_product"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Alphabetical_list_of_product"]["measures"];
      navToMany: {};
      navToOne: {};
      record: {
        ProductID: number;
        ProductName: string;
        SupplierID?: number;
        CategoryID?: number;
        QuantityPerUnit?: string;
        UnitPrice?: number;
        UnitsInStock?: number;
        UnitsOnOrder?: number;
        ReorderLevel?: number;
        Discontinued: boolean;
        CategoryName: string;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Category_Sales_for_1997': {
      keys: TNorthwindModel["NorthwindModel"]["Category_Sales_for_1997"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Category_Sales_for_1997"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Category_Sales_for_1997"]["measures"];
      navToMany: {};
      navToOne: {};
      record: {
        CategoryName: string;
        CategorySales?: number;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Current_Product_List': {
      keys: TNorthwindModel["NorthwindModel"]["Current_Product_List"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Current_Product_List"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Current_Product_List"]["measures"];
      navToMany: {};
      navToOne: {};
      record: {
        ProductID: number;
        ProductName: string;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Customer_and_Suppliers_by_City': {
      keys: TNorthwindModel["NorthwindModel"]["Customer_and_Suppliers_by_City"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Customer_and_Suppliers_by_City"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Customer_and_Suppliers_by_City"]["measures"];
      navToMany: {};
      navToOne: {};
      record: {
        City?: string;
        CompanyName: string;
        ContactName?: string;
        Relationship: string;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Invoice': {
      keys: TNorthwindModel["NorthwindModel"]["Invoice"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Invoice"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Invoice"]["measures"];
      navToMany: {};
      navToOne: {};
      record: {
        ShipName?: string;
        ShipAddress?: string;
        ShipCity?: string;
        ShipRegion?: string;
        ShipPostalCode?: string;
        ShipCountry?: string;
        CustomerID?: string;
        CustomerName: string;
        Address?: string;
        City?: string;
        Region?: string;
        PostalCode?: string;
        Country?: string;
        Salesperson: string;
        OrderID: number;
        OrderDate?: string;
        RequiredDate?: string;
        ShippedDate?: string;
        ShipperName: string;
        ProductID: number;
        ProductName: string;
        UnitPrice: number;
        Quantity: number;
        Discount: number;
        ExtendedPrice?: number;
        Freight?: number;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Order_Details_Extended': {
      keys: TNorthwindModel["NorthwindModel"]["Order_Details_Extended"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Order_Details_Extended"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Order_Details_Extended"]["measures"];
      navToMany: {};
      navToOne: {};
      record: {
        OrderID: number;
        ProductID: number;
        ProductName: string;
        UnitPrice: number;
        Quantity: number;
        Discount: number;
        ExtendedPrice?: number;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Order_Subtotal': {
      keys: TNorthwindModel["NorthwindModel"]["Order_Subtotal"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Order_Subtotal"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Order_Subtotal"]["measures"];
      navToMany: {};
      navToOne: {};
      record: {
        OrderID: number;
        Subtotal?: number;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Orders_Qry': {
      keys: TNorthwindModel["NorthwindModel"]["Orders_Qry"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Orders_Qry"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Orders_Qry"]["measures"];
      navToMany: {};
      navToOne: {};
      record: {
        OrderID: number;
        CustomerID?: string;
        EmployeeID?: number;
        OrderDate?: string;
        RequiredDate?: string;
        ShippedDate?: string;
        ShipVia?: number;
        Freight?: number;
        ShipName?: string;
        ShipAddress?: string;
        ShipCity?: string;
        ShipRegion?: string;
        ShipPostalCode?: string;
        ShipCountry?: string;
        CompanyName: string;
        Address?: string;
        City?: string;
        Region?: string;
        PostalCode?: string;
        Country?: string;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Product_Sales_for_1997': {
      keys: TNorthwindModel["NorthwindModel"]["Product_Sales_for_1997"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Product_Sales_for_1997"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Product_Sales_for_1997"]["measures"];
      navToMany: {};
      navToOne: {};
      record: {
        CategoryName: string;
        ProductName: string;
        ProductSales?: number;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Products_Above_Average_Price': {
      keys: TNorthwindModel["NorthwindModel"]["Products_Above_Average_Price"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Products_Above_Average_Price"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Products_Above_Average_Price"]["measures"];
      navToMany: {};
      navToOne: {};
      record: {
        ProductName: string;
        UnitPrice?: number;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Products_by_Category': {
      keys: TNorthwindModel["NorthwindModel"]["Products_by_Category"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Products_by_Category"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Products_by_Category"]["measures"];
      navToMany: {};
      navToOne: {};
      record: {
        CategoryName: string;
        ProductName: string;
        QuantityPerUnit?: string;
        UnitsInStock?: number;
        Discontinued: boolean;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Sales_by_Category': {
      keys: TNorthwindModel["NorthwindModel"]["Sales_by_Category"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Sales_by_Category"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Sales_by_Category"]["measures"];
      navToMany: {};
      navToOne: {};
      record: {
        CategoryID: number;
        CategoryName: string;
        ProductName: string;
        ProductSales?: number;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Sales_Totals_by_Amount': {
      keys: TNorthwindModel["NorthwindModel"]["Sales_Totals_by_Amount"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Sales_Totals_by_Amount"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Sales_Totals_by_Amount"]["measures"];
      navToMany: {};
      navToOne: {};
      record: {
        SaleAmount?: number;
        OrderID: number;
        CompanyName: string;
        ShippedDate?: string;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Summary_of_Sales_by_Quarter': {
      keys: TNorthwindModel["NorthwindModel"]["Summary_of_Sales_by_Quarter"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Summary_of_Sales_by_Quarter"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Summary_of_Sales_by_Quarter"]["measures"];
      navToMany: {};
      navToOne: {};
      record: {
        ShippedDate?: string;
        OrderID: number;
        Subtotal?: number;
      };
      actions: never;
      functions: never;
    };
    'NorthwindModel.Summary_of_Sales_by_Year': {
      keys: TNorthwindModel["NorthwindModel"]["Summary_of_Sales_by_Year"]["keys"];
      fields: TNorthwindModel["NorthwindModel"]["Summary_of_Sales_by_Year"]["fields"];
      measures: TNorthwindModel["NorthwindModel"]["Summary_of_Sales_by_Year"]["measures"];
      navToMany: {};
      navToOne: {};
      record: {
        ShippedDate?: string;
        OrderID: number;
        Subtotal?: number;
      };
      actions: never;
      functions: never;
    };
  };
  complexTypes: {};
  enumTypes: {};
  functions: {};
  actions: {};
}

/**
 * oData class
 * 
 * Model: NorthwindModel
 * 
 * @example
 * const model = NorthwindModel.getInstance()
 */
export class NorthwindModel extends OData<TNorthwindModelOData> {
  public static readonly serviceName = "nORTHWINDV2" as const;
  private static instance?: NorthwindModel;
  public static getInstance() {
    if (!NorthwindModel.instance) {
      NorthwindModel.instance = new NorthwindModel()
    }
    return NorthwindModel.instance
  }
  public static async entitySet<T extends keyof TNorthwindModelOData['entitySets']>(name: T) {
    const instance = NorthwindModel.getInstance()
    return instance.entitySet<T>(name)
  }
  private constructor(opts?: TODataOptions) {
    super("nORTHWINDV2", {...opts, path: "/V2/Northwind/Northwind.svc"})
  }
}

