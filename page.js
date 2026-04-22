//   var app = angular.module("productApp", []);
var app = angular.module("productApp", ["ngRoute"]);

// let balls = ['whiteball', 2, 'yes', 'No']

// let addProduct = function () {
//     let anotherBall = {
//         "First Name": 'White',
//         Total: 2,
//         Age: 4,
//         balls: function (dosomothing) {
//             dosomothing("Fav😂")
//         }
//     }

//     return anotherBall
// };

// let val = addProduct();

// val.balls(function (response){
//     console.log(response)
// })




app.config(function ($routeProvider) {

    $routeProvider
        .when("/home", {
            templateUrl: "home.html",
            controller: "ProductController"
        })
        .when("/add", {
            templateUrl: "add.html",
            controller: "ProductController"
        })
        .otherwise({
            redirectTo: "/home"
        });

});

app.service("ProductService", function () {
    this.products = [
        { name: "Laptop", price: 250000, category: "Electronics", quantity: 10 },
        { name: "Phone", price: 150000, category: "Electronics", quantity: 50 },
        { name: "Shoes", price: 20000, category: "Fashion", quantity: 100 },
        { name: "Bag", price: 12000, category: "Fashion", quantity: 40 },
        { name: "Headphones", price: 30000, category: "Accessories", quantity: 25 }
    ];
});
app.controller("ProductController", function ($scope, ProductService) {
    $scope.selectedProduct = null;
    $scope.products = ProductService.products;
    $scope.product = { name: "", price: "", category: "", quantity: "" };
    $scope.isDarkMode = false; // default is light mode
    $scope.orderQty = 1;
    $scope.cart = [];
    $scope.cartOpen = false;

    // $scope.products = [
    //     { name: "Laptop", price: 250000, category: "Electronics", quantity: "10" },
    //     { name: "Phone", price: 150000, category: "Electronics", quantity: "50" },
    //     { name: "Shoes", price: 20000, category: "Fashion", quantity: "100" },
    //     { name: "Bag", price: 12000, category: "Fashion", quantity: "40" },
    //     { name: "Headphones", price: 30000, category: "Accessories", quantity: "25" }
    // ];


    $scope.toggleProduct = function (item) {

        if ($scope.selectedProduct === item) {
            $scope.selectedProduct = null; // close if already open
        } else {
            $scope.selectedProduct = item; // open new one
        }

    };

    $scope.toggleDarkMode = function () {
        $scope.isDarkMode = !$scope.isDarkMode;
    };

    $scope.addProduct = function () {
        ProductService.products.unshift($scope.product)
        // $scope.products.push($scope.product)
        $scope.product = { name: "", price: "", category: "", quantity: "" }
    };

    $scope.removeProduct = function () {
        if ($scope.selectedProduct.quantity > 0) {
            $scope.selectedProduct.quantity--;
        }
        else { $scope.selectedProduct.quantity = 0 }

    };


    $scope.placeOrder = function () {
        if (!$scope.selectedProduct) {
            alert("Please select a product");
            return;}

        if (!$scope.orderQty || $scope.orderQty <= 0) {
            alert("Enter a valid quantity");
            return; }

        if ($scope.orderQty > $scope.selectedProduct.quantity) {
            alert("Not enough stock available!");
            return; }

        $scope.selectedProduct.quantity -= $scope.orderQty;

      var existing = $scope.$parent.cart.find(function(c) { 
    return c.name === $scope.selectedProduct.name; 
});
if (existing) {
    existing.qty += $scope.orderQty;
} else {
    $scope.$parent.cart.push({ 
        name: $scope.selectedProduct.name, 
        qty: $scope.orderQty, 
        price: $scope.selectedProduct.price 
    });
}
        // alert("Order placed successfully!");
        $scope.orderPopup = true;

        $scope.orderQty = 1;
    };


  //cart total
    $scope.cartTotal = function() {
    var total = 0;
    $scope.cart.forEach(function(item) {
        total += item.price * item.qty;
    });
    return total;
};


    $scope.showPopup = true;

    $scope.closePopup = function () {
    $scope.showPopup = false;
    $scope.orderPopup = false;
    };

    $scope.searchText = "";


});

// Anything that should be visible on every page lives in index.html.
//  Anything that is specific to one page lives in home.html or add.html.