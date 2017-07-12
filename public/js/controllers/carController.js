app.controller('carController', function ($scope, $stateParams, carsFactory) {


    carsFactory.getCar($stateParams.id).then(function (car) {
        $scope.car = car;
    })

    $scope.addComment = function () {
        var newCommentSubmit = {
            id: this.car._id,
            reviewBy: this.commentName,
            reviewContent: this.commentBody

        }
        carsFactory.addComment(newCommentSubmit)
            .then(function (data) {})
    }

    $scope.deleteComment = function (commentId) {
        carsFactory.removeComment(commentId, $stateParams.id)
            .then(function (data) {})
    }


});