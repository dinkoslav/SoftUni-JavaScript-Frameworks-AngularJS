app.controller('NewsFeedController',
    ['$scope', 'postsData', '$routeParams', '$localStorage', 'profileImage', 'friendsData', '$route', function($scope, postsData, $routeParams, $localStorage, profileImage, friendsData, $route){

    $scope.newsfeedData = [];
    $scope.postsOwner = '';
    $scope.postsStartId = '';
    $scope.editPostShown = false;
    $scope.editPostData = [];
    $scope.editPostOldText = '';
    $scope.addCommentShown = false;
    $scope.addCommentPostData = [];
    $scope.editCommentShown = false;
    $scope.editCommentPostId = 0;
    $scope.editCommentPostData = [];
    $scope.editCommentOldText = '';

    $scope.likePost = function(postId){
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId){
                if(post.author.isFriend || post.wallOwner.isFriend){
                    postsData.likePost(postId)
                        .$promise
                        .then(function(data) {
                            post.liked = true;
                            post.likesCount = post.likesCount + 1;
                            alertify.success('You Liked A Post.');
                        }, function (error) {
                            alertify.error('Liking Failed! Try Again!');
                        })
                }
                else{
                    alertify.error('You can only like your friends posts!');
                }
            }
        });
    };

    $scope.unlikePost = function(postId){
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId){
                if(post.author.isFriend || post.wallOwner.isFriend) {
                    postsData.unlikePost(postId)
                        .$promise
                        .then(function(data) {
                            $scope.newsfeedData.forEach(function(post){
                                if(post.id == postId){
                                    post.liked = false;
                                    post.likesCount = post.likesCount - 1;
                                }
                            });
                            alertify.success('You Unliked A Post!');
                        }, function (error) {
                            alertify.error('Unliking Failed! Try Again!');
                        })
                }
                else{
                    alertify.error('You can only unlike your posts or your friends posts!');
                }
            }
        })
    };

    $scope.showCommentPost = function(postId){
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId) {
                if(post.author.username == $localStorage['username'] || post.wallOwner.isFriend || post.wallOwner.username == $localStorage['username']){
                    $scope.addCommentPostData = post;
                    $scope.addCommentShown = true;
                }
                else{
                    alertify.error('You can comment only your posts or friends posts!');
                    $scope.addCommentShown = false;
                }
            }
        });
    };

    $scope.showEditPost = function(postId){
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId) {
                if (post.author.username == $localStorage['username']) {
                    $scope.editPostOldText = post.postContent;
                    $scope.editPostData = post;
                    $scope.editPostShown = true;
                }
                else {
                    alertify.error('You can edit only your posts!');
                }
            }
        });
    };

    $scope.deletePost = function(postId){
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId){
                if(post.author.username == $localStorage['username'] || post.wallOwner.username == $localStorage['username']){
                    postsData.deletePost(postId)
                        .$promise
                        .then(function(data) {
                            alertify.success('Post Successfully Deleted.');
                            $route.reload();
                        }, function (error) {
                            alertify.error('Post Delete Failed! Try Again!');
                        })
                }
                else{
                    alertify.error('You can delete your or your wall posts!');
                }
            }
        })
    };

    $scope.moreComments = function(){
            // TODO
    };

    $scope.likeComment = function(postId, commentId){
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId){
                if(post.author.isFriend || post.wallOwner.isFriend){
                    post.comments.forEach(function(comment){
                        if(comment.id == commentId){
                            postsData.likeComment(postId, commentId)
                                .$promise
                                .then(function(data) {
                                    comment.liked = true;
                                    comment.likesCount += 1;
                                    alertify.success('You Liked A Comment.');
                                }, function (error) {
                                    alertify.error('Liking Failed! Try Again!');
                                })
                        }
                    });
                }
                else{
                    alertify.error('You can only like your friends posts comments!');
                }
            }
        });
    };

    $scope.unlikeComment = function(postId, commentId){
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId){
                if(post.author.isFriend || post.wallOwner.isFriend){
                    post.comments.forEach(function(comment){
                        if(comment.id == commentId){
                            postsData.unlikeComment(postId, commentId)
                                .$promise
                                .then(function(data) {
                                    comment.liked = false;
                                    comment.likesCount -= 1;
                                    alertify.success('You Unliked A Comment.');
                                }, function (error) {
                                    alertify.error('Unliking Failed! Try Again!');
                                })
                        }
                    });
                }
                else{
                    alertify.error('You can only like your friends posts comments!');
                }
            }
        });
    };

    $scope.deleteComment = function(postId, commentId){
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId){
                post.comments.forEach(function(comment){
                    if(comment.id == commentId){
                        if(post.author.username == $localStorage['username'] || comment.author.username == $localStorage['username']){
                        postsData.deleteComment(postId, commentId)
                            .$promise
                            .then(function(data) {
                                alertify.success('You Deleted A Comment.');
                                $route.reload();
                            }, function (error) {
                                alertify.error('Delete Failed! Try Again!');
                            })
                        }
                        else{
                            alertify.error('You can only delete own or your posts comments!');
                        }
                    }
                })
            }
        });
    };

    $scope.showEditComment = function(postId, commentId){
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId) {
                post.comments.forEach(function(comment){
                    if(comment.id == commentId){
                        if (comment.author.username == $localStorage['username']) {
                            $scope.editCommentOldText = comment.commentContent;
                            $scope.editCommentPostData = comment;
                            $scope.editCommentShown = true;
                            $scope.editCommentPostId = postId;
                        }
                        else {
                            alertify.error('You can edit only your comments!');
                        }
                    }
                });
            }
        });
    };

    if(!$routeParams.username){
        $scope.postsOwner = $localStorage['username'];
        postsData.getNewsFeed($scope.postsStartId)
            .$promise
            .then(function(data) {
                data.forEach(function(post){
                    if(post.author.profileImageData == null){
                        post.author.profileImageData = "data:image/jpg;base64," + profileImage;
                    }

                    if(post.wallOwner.profileImageData == null){
                        post.wallOwner.profileImageData = "data:image/jpg;base64," + profileImage;
                    }

                    post.comments.forEach(function(comment){
                        if(comment.author.profileImageData == null){
                            comment.author.profileImageData = "data:image/jpg;base64," + profileImage;
                        }
                    });

                    $scope.newsfeedData.push(post);
                });
            }, function (error) {
                alertify.error('Server Error! Try Again!');
            })
    }
    else{
        $scope.postsOwner = $routeParams.username;
        postsData.getUserWall($scope.postsStartId, $scope.postsOwner)
            .$promise
            .then(function(data) {
                data.forEach(function(post){
                    if(post.author.profileImageData == null){
                        post.author.profileImageData = "data:image/jpg;base64," + profileImage;
                    }

                    if(post.wallOwner.profileImageData == null){
                        post.wallOwner.profileImageData = "data:image/jpg;base64," + profileImage;
                    }

                    post.comments.forEach(function(comment){
                        if(comment.author.profileImageData == null){
                            comment.author.profileImageData = "data:image/jpg;base64," + profileImage;
                        }
                    });

                    $scope.newsfeedData.push(post);
                });
            }, function (error) {
                alertify.error('Server Error! Try Again!');
            });
    }
}]);
