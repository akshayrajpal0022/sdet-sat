define({ "api": [
  {
    "type": "post",
    "url": "/auth/signin",
    "title": "Signin",
    "name": "Signin",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user for the given username.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of response. True if successful, false if error</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count of the records in data.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "error",
            "description": "<p>Error details if success is false.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Requested token if success is true.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"success\": true,\n\t\"data\": [\n\t\t{\n\t\t\t\"id\":\"5eb572f950caeb3b9715f300\"\n\t\t    \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjVlYjU3MmY5NTBjYWViM2I5NzE1ZjMwMF9GcmkgTWF5IDA4IDIwMjAgMjA6NDQ6NTkgR01UKzA1MzAgKEluZGlhIFN0YW5kYXJkIFRpbWUpIg.QNfQWVmNGybPKtvnEhMrFiLwEI7yqb5J_f-vbSHgp_8\"\n\t\t}\n\t],\n\t\"count\": 1,\n\t\"error\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/categories/",
    "title": "Create Category",
    "name": "Category_Create",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent",
            "description": "<p>Parent category id OR null.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of category.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "details",
            "description": "<p>Details of category.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of response. True if successful, false if error</p>"
          },
          {
            "group": "201",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count of the records in data.</p>"
          },
          {
            "group": "201",
            "type": "Object[]",
            "optional": false,
            "field": "error",
            "description": "<p>Error details if success is false.</p>"
          },
          {
            "group": "201",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Details of newly created category if success is true.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n\t\"success\": true,\n\t\"data\": [\n\t\t{\n\t\t    \"status\": true,\n\t\t    \"_id\": \"5cee514f415a7c350df6fc5a\",\n\t\t    \"parent\": \"5ced16ac6ff7c3520b2721ed\",\n\t\t    \"name\": \"Formals\",\n\t\t    \"details\": \"Men's formals shoe collections\",\n\t\t    \"created_at\": \"2019-05-29T09:30:55.065Z\",\n\t\t    \"updated_at\": \"2019-05-29T09:30:55.065Z\",\n\t\t    \"__v\": 0\n\t\t}\n\t],\n\t\"count\": 1,\n\t\"error\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/categories.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/categories/",
    "title": "Get Categories",
    "name": "Category_Get",
    "group": "Category",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of response. True if successful, false if error</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count of the records in data.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "error",
            "description": "<p>Error details if success is false.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Requested list of categories and sub categories if success is true.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"success\": true,\n    \"count\": 6,\n    \"data\": [\n        {\n            \"_id\": \"5ced16766ff7c3520b271f39\",\n            \"parent\": null,\n            \"name\": \"Men\",\n            \"details\": \"Mens shoes collection\",\n            \"status\": true,\n            \"sub_categories\": [\n                {\n                    \"_id\": \"5ced16ac6ff7c3520b2721ed\",\n                    \"parent\": \"5ced16766ff7c3520b271f39\",\n                    \"name\": \"Shoes\",\n                    \"details\": \"Men's shoe collections\",\n                    \"status\": true\n                },\n                {\n                    \"_id\": \"5ced2dd96ff7c3520b283c26\",\n                    \"parent\": \"5ced16766ff7c3520b271f39\",\n                    \"name\": \"Sunglasses\",\n                    \"details\": \"Men's Sunglases collections\",\n                    \"status\": true\n                }\n            ]\n        },\n        {\n            \"_id\": \"5ced1da86ff7c3520b2774b3\",\n            \"parent\": \"5ced16ac6ff7c3520b2721ed\",\n            \"name\": \"Sports & Fitness\",\n            \"details\": \"Men's sports shoe collections\",\n            \"status\": true,\n            \"sub_categories\": []\n        }\n    ],\n\t\"error\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/categories.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/categories/:category_id",
    "title": "Get Category By Id",
    "name": "Category_Get_By_Id",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>Category id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of response. True if successful, false if error</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count of the records in data.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "error",
            "description": "<p>Error details if success is false.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Requested category details if success is true.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"success\": true,\n    \"count\": 1,\n    \"data\": [\n        {\n            \"_id\": \"5ced16766ff7c3520b271f39\",\n            \"parent\": null,\n            \"name\": \"Men\",\n            \"details\": \"Mens shoes collection\",\n            \"status\": true,\n            \"sub_categories\": [\n                {\n                    \"_id\": \"5ced16ac6ff7c3520b2721ed\",\n                    \"parent\": \"5ced16766ff7c3520b271f39\",\n                    \"name\": \"Shoes\",\n                    \"details\": \"Men's shoe collections\",\n                    \"status\": true\n                },\n                {\n                    \"_id\": \"5ced2dd96ff7c3520b283c26\",\n                    \"parent\": \"5ced16766ff7c3520b271f39\",\n                    \"name\": \"Sunglasses\",\n                    \"details\": \"Men's Sunglases collections\",\n                    \"status\": true\n                }\n            ]\n        }\n    ],\n\t\"error\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/categories.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/categories/:category_id/products",
    "title": "Get Category Products",
    "name": "Category_Products_By_Id",
    "group": "Category",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of response. True if successful, false if error</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count of the records in data.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "error",
            "description": "<p>Error details if success is false.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Requested list of products under the category if success is true.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"success\": true,\n    \"count\": 1,\n    \"data\": [\n        {\n            \"_id\": \"5cee34b46ff7c3520b36ae69\",\n            \"name\": \"Fastrack Sunglasses Round\",\n            \"categories\": [\n                \"5ced2dd96ff7c3520b283c26\"\n            ],\n            \"categoryObject\": [\n                {\n                    \"_id\": \"5ced2dd96ff7c3520b283c26\",\n                    \"parent\": \"5ced16766ff7c3520b271f39\",\n                    \"name\": \"Sunglasses\",\n                    \"details\": \"Men's Sunglases collections\",\n                    \"status\": true\n                }\n            ],\n            \"description\": \"Fastrack Sunglasses Round\",\n            \"price\": 1500\n        }\n    ],\n\t\"error\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/categories.js",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "/products/",
    "title": "Create Product",
    "name": "Product_Create",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of category.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "categories",
            "description": "<p>Array of categories.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of product.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of response. True if successful, false if error</p>"
          },
          {
            "group": "201",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count of the records in data.</p>"
          },
          {
            "group": "201",
            "type": "Object[]",
            "optional": false,
            "field": "error",
            "description": "<p>Error details if success is false.</p>"
          },
          {
            "group": "201",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Details of newly created product if success is true.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n\t\"success\": true,\n\t\"data\": [\n\t\t{\n\t\t    \"status\": true,\n\t\t    \"_id\": \"5cee4d366949732d4749cf9d\",\n\t\t    \"name\": \"Rebook Crossfit 2.0\",\n\t\t    \"categories\": \"5ced1da86ff7c3520b2774b3\",\n\t\t    \"description\": \"Rebook Crossfit 2.0\",\n\t\t    \"price\": 10500,\n\t\t    \"created_at\": \"2019-05-29T09:13:26.812Z\",\n\t\t    \"updated_at\": \"2019-05-29T09:13:26.812Z\",\n\t\t    \"__v\": 0\n\t\t}\n\t],\n\t\"count\": 1,\n\t\"error\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "put",
    "url": "/products/:product_id",
    "title": "Update Product",
    "name": "Product_Update",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of category.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "categories",
            "description": "<p>Array of categories.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of product.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of response. True if successful, false if error</p>"
          },
          {
            "group": "201",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count of the records in data.</p>"
          },
          {
            "group": "201",
            "type": "Object[]",
            "optional": false,
            "field": "error",
            "description": "<p>Error details if success is false.</p>"
          },
          {
            "group": "201",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Details of updated product if success is true.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n\t\"success\": true,\n\t\"data\": [\n\t\t{\n\t\t    \"status\": true,\n\t\t    \"_id\": \"5cee4d366949732d4749cf9d\",\n\t\t    \"name\": \"Rebook Crossfit 2.0\",\n\t\t    \"categories\": \"5ced1da86ff7c3520b2774b3\",\n\t\t    \"description\": \"Rebook Crossfit 2.0\",\n\t\t    \"price\": 10500,\n\t\t    \"created_at\": \"2019-05-29T09:13:26.812Z\",\n\t\t    \"updated_at\": \"2019-05-29T09:13:26.812Z\",\n\t\t    \"__v\": 0\n\t\t}\n\t],\n\t\"count\": 1,\n\t\"error\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/products/",
    "title": "Get Products",
    "name": "Products_Get",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>Query parameter comma separated category ids.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of response. True if successful, false if error</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count of the records in data.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "error",
            "description": "<p>Error details if success is false.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Requested list of products if success is true.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"success\": true,\n    \"count\": 6,\n    \"data\": [\n        {\n            \"_id\": \"5ced16766ff7c3520b271f39\",\n            \"parent\": null,\n            \"name\": \"Men\",\n            \"details\": \"Mens shoes collection\",\n            \"status\": true,\n            \"sub_categories\": [\n                {\n                    \"_id\": \"5ced16ac6ff7c3520b2721ed\",\n                    \"parent\": \"5ced16766ff7c3520b271f39\",\n                    \"name\": \"Shoes\",\n                    \"details\": \"Men's shoe collections\",\n                    \"status\": true\n                },\n                {\n                    \"_id\": \"5ced2dd96ff7c3520b283c26\",\n                    \"parent\": \"5ced16766ff7c3520b271f39\",\n                    \"name\": \"Sunglasses\",\n                    \"details\": \"Men's Sunglases collections\",\n                    \"status\": true\n                }\n            ]\n        },\n        {\n            \"_id\": \"5ced1da86ff7c3520b2774b3\",\n            \"parent\": \"5ced16ac6ff7c3520b2721ed\",\n            \"name\": \"Sports & Fitness\",\n            \"details\": \"Men's sports shoe collections\",\n            \"status\": true,\n            \"sub_categories\": []\n        }\n    ],\n\t\"error\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/products/:product_id",
    "title": "Get Product By Id",
    "name": "Products_Get_By_Id",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "product_id",
            "description": "<p>Product id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of response. True if successful, false if error</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count of the records in data.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "error",
            "description": "<p>Error details if success is false.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Requested details of product if success is true.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"success\": true,\n    \"count\": 1,\n    \"data\": [\n        {\n            \"_id\": \"5cee4cceb0c05422f3911ee2\",\n            \"name\": \"Rebook Crossfit 1.0\",\n            \"categories\": [\n                \"5ced1da86ff7c3520b2774b3\"\n            ],\n            \"categoryObject\": [\n                {\n                    \"_id\": \"5ced1da86ff7c3520b2774b3\",\n                    \"parent\": \"5ced16ac6ff7c3520b2721ed\",\n                    \"name\": \"Sports & Fitness\",\n                    \"details\": \"Men's sports shoe collections\",\n                    \"status\": true\n                }\n            ],\n            \"description\": \"Rebook Crossfit 1.0\",\n            \"price\": 100000\n        }\n    ],\n\t\"error\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/products.js",
    "groupTitle": "Product"
  }
] });
