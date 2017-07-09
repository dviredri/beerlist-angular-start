app.controller('carsCtrl', function ($scope, carsFactory) {


            $scope.cars = [];

            $scope.addCar = function () {
                var newCar = {
                    make: $scope.make,
                    carModel: $scope.model,
                    image_url: $scope.image,
                    year: $scope.year,
                    ratingTotal: 0,
                    numberOfRatings: 0
                };
                carsFactory.addNewCar(newCar)
                    .then(function (newCar) {
                        $scope.cars.push(newCar);
                    });
            }

            $scope.removeCar = function () {
                var removeId = this.car._id
                carsFactory.removeCar(removeId)
                    .then(function (data) {
                        for (var i = 0; i < $scope.cars.length; i++) {
                            if ($scope.cars[i]._id == data._id) {
                                $scope.cars.splice(i, 1)
                            }
                        }
                    });
            }

            $scope.submitRating = function () {
                var newRatingSubmit = {
                    id: this.car._id,
                    userRating: this.rating
                }
                carsFactory.submitRating(newRatingSubmit)
                    .then(function (data) {
                            // for (var i = 0; i < $scope.cars.length; i++) {
                            //     if ($scope.cars[i]._id == data._id) {
                            //         $scope.cars.ratingTotal = $scope.cars.ratingTotal + data.ratingTotal;
                            //         $scope.cars.numberOfRatings += 1
                            //     }
                    
                    // };
                    })
            }  

                carsFactory.getCars().then(function (cars) {
                        $scope.cars = cars;
                    })
                    .catch(function (error) {
                        console.log(error)
                    });;

                $scope.carsFactory = carsFactory.cars;


            });