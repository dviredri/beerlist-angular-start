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

    carsFactory.removeComment = function (removeCommentId,carId) {

        return $http.delete('/cars/' + carId+ '/reviews/'+removeCommentId )
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

    carsFactory.getCar = function (carID) {
        return $http.get('/cars/'+ carID)
            .then(function (response) {
                return angular.copy(response.data);
            });
    };

    carsFactory.submitRating = function (newRatingSubmitcar) {
        var updateId = newRatingSubmitcar.id;
        var rating = {
            userRating: newRatingSubmitcar.userRating
        };
        return $http.post('/cars/' + updateId + '/rating', rating)
            .then(function (response) {
                return angular.copy(response.data);
            });
    };

    carsFactory.addComment = function (newCommentSubmitcar) {
        var updateId = newCommentSubmitcar.id;
        var comment = {
            reviewBy: newCommentSubmitcar.reviewBy,
            reviewContent: newCommentSubmitcar.reviewContent
        };
        return $http.post('/cars/' + updateId + '/reviews', comment)
            .then(function (response) {
                return angular.copy(response.data);
            });
    };

    // carsFactory.getCarInfo = function (id) {
    //     return $http.get('/cars/' + id)
    //         .then(function (response) {
    //             return response.data
    //         }, function (err) {
    //             console.error(err)
    //         });
    // };

    return carsFactory;
})