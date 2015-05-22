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
    $scope.commentUserStatus = '';

    $scope.likePost = function(postId){
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId){
                if((post.author.isFriend || post.wallOwner.isFriend) && post.author.username != $localStorage['username']){
                    postsData.likePost(postId)
                        .$promise
                        .then(function(data) {
                            post.liked = true;
                            post.likesCount = post.likesCount + 1;
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
                if((post.author.isFriend || post.wallOwner.isFriend) && post.author.username != $localStorage['username']) {
                    postsData.unlikePost(postId)
                        .$promise
                        .then(function(data) {
                            $scope.newsfeedData.forEach(function(post){
                                if(post.id == postId){
                                    post.liked = false;
                                    post.likesCount = post.likesCount - 1;
                                }
                            });
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
        var postCounter = 0;
        var postPosition = 0;
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId){
                if(post.author.username == $localStorage['username'] || post.wallOwner.username == $localStorage['username']){
                    postPosition = postCounter;
                    postsData.deletePost(postId)
                        .$promise
                        .then(function(data) {
                            alertify.success('Post Successfully Deleted.');
                        }, function (error) {
                            alertify.error('Post Delete Failed! Try Again!');
                        })
                }
                else{
                    alertify.error('You can delete your or your wall posts!');
                }
            }
            postCounter++;
        });

        $scope.newsfeedData.splice(postPosition, 1);
    };

    $scope.moreComments = function(postId){
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId){
                postsData.getPostComments(postId)
                    .$promise
                    .then(function(data) {
                        post.comments = data;
                    }, function (error) {
                        alertify.error('Getting Comments Failed! Try Again!');
                    })
            }
        })
    };

    $scope.lessComments = function(postId){
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId){
                post.comments = post.comments.slice(0, 3);
            }
        })
    };

    $scope.likeComment = function(postId, commentId){
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId){
                if((post.author.isFriend || post.wallOwner.isFriend) && post.author.username != $localStorage['username']){
                    post.comments.forEach(function(comment){
                        if(comment.id == commentId){
                            postsData.likeComment(postId, commentId)
                                .$promise
                                .then(function(data) {
                                    comment.liked = true;
                                    comment.likesCount += 1;
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
                if((post.author.isFriend || post.wallOwner.isFriend) && post.author.username != $localStorage['username']){
                    post.comments.forEach(function(comment){
                        if(comment.id == commentId){
                            postsData.unlikeComment(postId, commentId)
                                .$promise
                                .then(function(data) {
                                    comment.liked = false;
                                    comment.likesCount -= 1;

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
                                postsData.getPostComments(postId)
                                    .$promise
                                    .then(function(data) {
                                        if(post.totalCommentsCount == post.comments.length){
                                            post.comments = data;
                                        }
                                        else{
                                            post.comments = data.slice(0,3);
                                        }

                                        post.totalCommentsCount -= 1;
                                    });
                                alertify.success('You Deleted A Comment.');
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

    $scope.sendFriendRequestFromPost = function(postId){
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId){
                friendsData.sendFriendRequest(post.author.username)
                    .$promise
                    .then(function (data) {
                        post.author.hasPendingRequest = true;
                        alertify.success('Friend Invite Send Successfully!');
                    }, function(error){
                        alertify.error('Friend Invite Failed! Try again!');
                    })
            }
        });
    };

    $scope.sendFriendRequestFromComment = function(postId, commentId){
        $scope.newsfeedData.forEach(function(post){
            if(post.id == postId){
                post.comments.forEach(function(comment){
                    if(comment.id == commentId){
                        friendsData.sendFriendRequest(comment.author.username)
                            .$promise
                            .then(function (data) {
                                comment.author.hasPendingRequest = true;
                                alertify.success('Friend Invite Send Successfully!');
                            }, function(error){
                                alertify.error('Friend Invite Failed! Try again!');
                            })
                    }
                });
            }
        });
    };

    $scope.commentHover = function(username){
        friendsData.getUserFullData(username)
            .$promise
            .then(function (data) {
                if(data.hasPendingRequest && data.username != $localStorage['username']){
                    $scope.commentUserStatus = 'Pending';
                }
                else if(data.isFriend){
                    $scope.commentUserStatus = 'Friend';
                }
                else if(!data.isFriend && !data.hasPendingRequest){
                    $scope.commentUserStatus = 'Invite';
                }
            });

        return true;
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
