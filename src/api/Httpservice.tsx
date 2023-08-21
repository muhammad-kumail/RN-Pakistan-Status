import {
  doHttpGet,
  // doHttpMultipart,
  doHttpPost,
  // doHttpGetAfterLogin,
  // doHttpMultipartWithOutAuth,
  // doHttpPatch,
  // doHttpPatchWithoutMultipart,
  // doHttpPostWithoutMultpart,
  // doHttpMultipartWithoutdata,
  // doHttpProddeleteProduct,
  // doHttpAuthPatch,
  // doHttpNewPass,
  // doHttpPatchWithoutBody,
  // doHttpDelete,
  // doHttpMultipartwithPatch,
  // doHttpAuth,
  // doHttpGetById
} from './HttpUtils';
// import messaging from '@react-native-firebase/messaging';

export const getHomeVides = () => {
  return doHttpGet('app/getLatestContent');
};
export const getHomeAudios = () => {
  return doHttpGet('getAudioContent');
};
export const getProfileImgs = () => {
  return doHttpGet('getProfileImg');
};

export const getDataByPost = (data: any , endpoint: any) => {
  return doHttpPost(data, endpoint);
};


export const getData = (endpoint: any) => {
  return doHttpGet(endpoint);
};

// export const loginVendor = (data: any) => {
//   return doHttpAuth(data, 'verdor/Login');
// };

// export const userRegister = (data: any) => {
//   return doHttpAuth(data, 'user/register');
// };
// export const vendorRegister = (data: any) => {
//   return doHttpAuth(data, 'verdor/register');
// };
// export const vendorRegisterOtp = (data: any) => {
//   return doHttpAuth(data, 'verdor/verifyOTP');
// };

// export const profileSetup = (data: any) => {
//   return doHttpMultipartWithOutAuth(data, 'auth/profile-setup');
// };

// export const forgotPassword = (data: any) => {
//   console.log("email ", data)
//   return doHttpAuthPatch(data, 'forgotPassword');
// };
// export const vForgotPassword = (data: any) => {
//   console.log("email ", data)
//   return doHttpAuthPatch(data, '/verdor/forgotPassword');
// };
// export const verifyEmail = (data: any) => {
//   return doHttpAuth(data, 'auth/verification-code');
// };

// export const verifyOtp = (data: any) => {
//   return doHttpAuth(data, 'verifyForgotPasswordOtp');
// };
// export const VverifyOtp = (data: any) => {
//   return doHttpAuth(data, 'verdor/verifyForgotPasswordOtp');
// };

// export const resetPassword = (data: any) => {
//   return doHttpNewPass(data, 'resetPassword');
// };
// export const VresetPassword = (data: any) => {
//   return doHttpNewPass(data, 'verdor/resetPassword');
// };

// export const googleApiHit = (data: any , endpoint: any) => {
//   return doHttpAuth(data, endpoint);
// };

// export const facebookLogin = (data: any) => {
//   return doHttpAuth(data, 'auth/api/facebook-login');
// };

// export const appleSignin = (data: any) => {
//   return doHttpAuth(data, 'auth/api/apple-login');
// };

// export const createServicePost = (data: any, token: any) => {
//   return doHttpMultipart(data, token, 'service/post');
// };

// export const createSocialPost = (data: any, token: any) => {
//   return doHttpMultipart(data, token, 'social/post');
// };

// export const getSuggestedPost = (token: any) => {
//   return doHttpGetAfterLogin(token, 'service/post/suggested');
// };

// export const searchSuggestedPost = (token: any, filterString: string) => {
//   return doHttpGetAfterLogin(token, 'service/post/search?' + filterString);
// };

// export const editProfile = (data: any, token: any, endpoint: any) => {
//   return doHttpPatch(data, token, endpoint);
// };

// export const sendProposal = (data: any, token: any) => {
//   return doHttpPostWithoutMultpart(data, token, 'service/post/proposals');
// };

// export const getPorposal = (token: any) => {
//   return doHttpGetAfterLogin(token, 'service/post');
// };

// export const getProposalList = (token: any, val: string) => {
//   return doHttpGetAfterLogin(
//     token,
//     'service/post/proposals?servicePostId=' + val,
//   );
// };

// export const acceptProposal = (data: any, token: any) => {
//   return doHttpPatchWithoutMultipart(data, token, 'service/post/proposals');
// };

// export const declineProposal = (data: any, token: any) => {
//   return doHttpPatchWithoutMultipart(
//     data,
//     token,
//     'service/post/proposals/reject',
//   );
// };

// export const addNotificationListener = () => {
//   messageForeGround();
//   messageBackGround();
//   messaging().onNotificationOpenedApp(remoteMessage => { });
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => { });
// };

// export const messageForeGround = () => {
//   return messaging().onMessage(async remoteMessage => {
//     EventRegister.emit('InAppNotification', remoteMessage);
//   });
// };

// export const messageBackGround = () => {
//   messaging().setBackgroundMessageHandler(async remoteMessage => { });
// };

// export const getTimeLinePosts = (token, keyword, page, size) => {
//   return doHttpGetAfterLogin(
//     token,
//     `social/post/timeline?searchKeyword=${keyword}&page=${page}&size=${size}`,
//   );
// };

// export const getExplorePosts = (token, keyword, page, size) => {
//   return doHttpGetAfterLogin(
//     token,
//     `social/post/explore?searchKeyword=${keyword}&page=${page}&size=${size}`,
//   );
// };

// export const getJobPostDetails = (token, postId) => {
//   return doHttpGetAfterLogin(token, `service/post/${postId}/details`);
// };

// export const getHomeSchedulesJobs = token => {
//   return doHttpGetAfterLogin(token, 'service/post/suggested');
// };

// export const getServerOnGoingJobs = token => {
//   return doHttpGetAfterLogin(token, 'schedules/server/ongoing');
// };

// export const getPendingJobs = token => {
//   return doHttpGetAfterLogin(token, 'schedules/server/pending');
// };

// export const getOngoingPosterJobs = token => {
//   return doHttpGetAfterLogin(token, 'schedules/poster/ongoing');
// };
// export const getJobHistory = token => {
//   return doHttpGetAfterLogin(token, 'schedules/poster/completed');
// };
// export const getPosterJobHistory = token => {
//   return doHttpGetAfterLogin(token, 'schedules/server/completed');
// };

// export const getUserDataAtHome = token => {
//   return doHttpGetAfterLogin(token, 'profile/user');
// };

// export const caneclRequestInschedules = (data, token) => {
//   return doHttpPatchWithoutMultipart(
//     data,
//     token,
//     'service/post/request/cancel',
//   );
// };

// export const cancelRequestInMyJobs = (data, token) => {
//   return doHttpPatchWithoutMultipart(
//     data,
//     token,
//     'service/post/proposals/cancel',
//   );
// };

// export const submitForReview = (data, token) => {
//   return doHttpMultipart(data, token, 'schedules/server/submission');
// };

// export const reviewPosterWork = (token, val) => {
//   return doHttpGetAfterLogin(token, `schedules/poster/${val}/review-work`);
// };

// export const approveWork = (data, token) => {
//   return doHttpPostWithoutMultpart(
//     data,
//     token,
//     'schedules/poster/approve-work',
//   );
// };

// export const getFcmToken = async (callback) => {
//   await messaging()
//     .getToken()
//     .then(response => {
//       callback(response)
//     });
// }

// export const logout = token => {
//   return doHttpMultipartWithoutdata(token, 'profile/user/logout');
// };

// export const getProfileSocailPost = token => {
//   return doHttpGetAfterLogin(token, 'profile/user/share');
// };

// export const getProfileServePost = token => {
//   return doHttpGetAfterLogin(token, 'profile/user/serve');
// };

// export const ProddeleteProductSocailPost = (token, id) => {
//   return doHttpProddeleteProduct(token, `social/post/${id}`);
// };

// export const startActivityBeforeTime = (data, token) => {
//   return doHttpPatchWithoutMultipart(data, token, 'service/post/start');
// };

// export const bounceBack = (data, token) => {
//   return doHttpPostWithoutMultpart(data, token, 'schedules/poster/bounce-back');
// };

// export const reportToAdminPost = (data, token) => {
//   return doHttpPostWithoutMultpart(
//     data,
//     token,
//     'schedules/poster/report-admin',
//   );
// };

// export const getNoticationHistory = (token: any) => {
//   return doHttpGetAfterLogin(token, 'notifications')
// }
// export const getSlider = () => {
//   return doHttpGet('getSlider')
// }
// export const getCat = () => {
//   return doHttpGet('user/getParentCategory')
// }
// export const getAllFeatureProduct = () => {
//   return doHttpGet('getAllFeature')
// }
// export const getAllNewArrivalProduct = () => {
//   return doHttpGet('getAllNewArrival')
// }
// export const getAllBuyNowProduct = () => {
//   return doHttpGet('getAllBuyNow')
// }
// export const getAllAccessoriesProduct = () => {
//   return doHttpGet('user/getAllAccessories')
// }
// export const getAllServices = () => {
//   return doHttpGet('user/getAllServices')
// }
// export const getSubCategoryById = (id: any) => {
//   return doHttpGetById(id, 'user/getallSubCategoryByParentId/')
// }
// export const getProductById = (id: any) => {
//   return doHttpGet(`getProductbyId/${id}`)
// }
// export const getProductsBySubCategoryId = (id: any) => {
//   return doHttpGetById(id, 'user/getAllProductsBySubCategory/')
// }
// export const getReviewByProductId = (id: any) => {
//   return doHttpGetById(id, 'getReviewByProduct/')
// }
// export const getSameProducts = (id: any) => {
//   return doHttpGetById(id, 'user/getSameProducts/')
// }
// // export const getFavProduct = (id) => {
// //   return doHttpGetById(id, 'getFavoriteProduct/')
// // }
// export const getFavProduct = (token: any, id: any) => {
//   return doHttpGetAfterLogin(token, `getFavoriteProduct/${id}`);
// };
// export const getMessage = (token: any, id: any) => {
//   return doHttpGetAfterLogin(token, `getComments/${id}`);
// };
// export const reviewSubmit = (data: any) => {
//   return doHttpMultipartWithOutAuth(data, 'addReview');
// };
// export const addQuote = (data: any) => {
//   return doHttpMultipartWithOutAuth(data, 'addGetQuote');
// };
// export const getUserDetail = (token: any) => {
//   return doHttpGetAfterLogin(token, 'getUserProfile')
// }
// export const getAllFav = (token: any) => {
//   return doHttpGetAfterLogin(token, 'getAllFavtProducts')
// }
// export const getHistory = (token: any) => {
//   return doHttpGetAfterLogin(token, 'getOrderHistory')
// }
// export const addOrRemoveFav = (data: any, token: any) => {
//   return doHttpPostWithoutMultpart(data, token, 'addToProduct');
// };
// export const updateVendorProfile = (data: any, token: any) => {
//   return doHttpPostWithoutMultpart(data, token, 'vendor/updateProfile');
// };
// export const paymentDone = (data: any, token: any) => {
//   return doHttpPostWithoutMultpart(data, token, 'choosePaymentMethod');
// };
// export const sendMessage = (data: any, token: any) => {
//   return doHttpPostWithoutMultpart(data, token, 'addComment');
// };
// export const creatNewOrder = (data: any, token: any) => {
//   return doHttpMultipart(data, token, 'createOrder');
// };


///////////////////////Vendor///////////////////////////////////////////

// export const addProduct = (data: any, token: any) => {
//   return doHttpMultipart(data, token, 'addProduct');
// };
// export const updateProduct = (data: any, token: any, id: any) => {
//   return doHttpPostWithoutMultpart(data, token, `updateProduct/${id}`);
// };
// export const addMultipart = (data: any, token: any, endpoint: any) => {
//   return doHttpMultipart(data, token, endpoint);
// };
// export const addMultipartpatch = (data: any, token: any, endpoint: any) => {
//   return doHttpMultipartwithPatch(data, token, endpoint);
// };
// export const getListData = (token: any, endpoint: any) => {
//   return doHttpGetAfterLogin(token, endpoint);
// };
// export const proDelOrRes = (token: any, endpoint: any) => {
//   return doHttpPatchWithoutBody(token, endpoint);
// };
// export const deletePermanent = (token: any, endpoint: any) => {
//   return doHttpDelete(token, endpoint);
// };
// export const changeStatus = (data: any, token: any, endpoint: any) => {
//   return doHttpPatch(data, token, endpoint);
// };
