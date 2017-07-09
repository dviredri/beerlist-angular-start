app.factory('carsFactory', function ($http) {

    var carsFactory = {};

    carsFactory.addNewCar = function (car) {
        return $http.post('/cars', car)
            .then(function (response) {
                return angular.copy(response.data);
            });
    };

    carsFactory.removeCar = function (removeId) {

        return $http.delete('/cars/' + removeId)
            .then(function (response) {
                return angular.copy(response.data);
            })
    };

    carsFactory.getCars = function (cars) {
        return $http.get('/cars')
            .then(function (response) {
                return angular.copy(response.data);
            });
    };

    carsFactory.submitRating = function (newRatingSubmitcar) {
        var updateId = newRatingSubmitcar.id;
        var rating = {userRating: newRatingSubmitcar.userRating};
        return $http.post('/cars/' + updateId + '/rating', rating)
            .then(function (response) {
                return angular.copy(response.data);
            });
    };

    return carsFactory;
})