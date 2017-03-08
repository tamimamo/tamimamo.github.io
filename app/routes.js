 module.exports = function(app, passport) {
     
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/main_admin', function(req, res) {
        res.render('pages/index.ejs');
    });

    // PROFILE SECTION =========================
//    app.get('/profile', isLoggedIn, function(req, res) {
//        res.render('pages/profile.ejs', {layout:'admin_side/admin' , user : req.user });
//    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
//        app.get('/login', function(req, res) {
//            var title="";
//            res.render('pages/signin.ejs', {message: req.flash('loginMessage'), title:title});
//        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/register', function(req, res) {
            res.render('pages/register.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/register', passport.authenticate('local-signup', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/register', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('pages/connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/pages/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/pages/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/pages/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/pages/profile');
        });
    });

////create a new express app
//  const express = require('express'),
//  app = express.app(),

  //client controllers
  layoutController = require('./controllers/layout.controller'),
  registerController = require('./controllers/register.controller'),
  mainController = require('./controllers/main.controller'),
  contactController = require('./controllers/contact.controller'),
  aboutController = require('./controllers/about.controller'),
  coursesController = require('./controllers/courses.controller'),
  fHCourseController = require('./controllers/4hCourse.controller'),
  eHCourseController = require('./controllers/8hCourse.controller'),
  ttHCourseController = require('./controllers/22hCourse.controller'),
  ffHCourseController = require('./controllers/44hCourse.controller'),
  sHCourseController = require('./controllers/60hCourse.controller'),
  fHBabyCourseController = require('./controllers/4hBabyCourse.controller'),
  medicalTeamsCourseController = require('./controllers/medicalTeamsCourse.controller'),
  paramedicCourseController = require('./controllers/paramedicCourse.controller'),
  approvalsController = require('./controllers/approvals.controller'),
  recommendationController = require('./controllers/recommendation.controller'),
  cartController = require('./controllers/cart.controller'),
  onlineCourseController = require('./controllers/onlineCourse.controller'),
  medicalEquipmentController = require('./controllers/medicalEquipment.controller'),
  medicalProductController = require('./controllers/medicalProduct.controller'),
  medicalFurnitureController = require('./controllers/medicalFurniture.controller'),
  equipmentCPRandFirstAidController = require('./controllers/equipmentCPRandFirstAid.controller'),
  trainingandSimulationEquipmentController = require('./controllers/trainingandSimulationEquipment.controller'),
  firstAidKitsController = require('./controllers/firstAidKits.controller'),

  //admin controllers
  mainadminController = require('./admin/main_admin.controller');


  //export app
//  module.exports = app;

//==================================================================================
  
  //client routes
  //define routes
  //layout routs
  app.get('/login', layoutController.showLogin);
//  
//  //register routes
//  app.get('/register', registerController.showRegister);
//  app.post('/register', registerController.processRegister);

  //main routes
  app.get('/', mainController.showProducts);
  app.post('/send', mainController.sendRequest);

  //contact routes
  app.get('/contact', contactController.showContact);
  app.post('/sendContact', contactController.sendRequest);

  //medical products routes
  app.get('/medicalProduct', medicalProductController.showMedicalProducts);
  app.get('/medicalProduct/:slug/add', medicalProductController.addToCart);

  //medical equipment routes
  app.get('/medicalEquipment', medicalEquipmentController.showMedicalEquipment);

  //medical furniture routes
  app.get('/medicalFurniture', medicalFurnitureController.showMedicalFurniture);

  //training & simulation equipment routes
  app.get('/trainingandSimulationEquipment', trainingandSimulationEquipmentController.showTrainingandSimulationEquipment);

  //first aid kits routes
  app.get('/firstAidKits', firstAidKitsController.showFirstAidKits);

  //equipment CPR & first aid routes
  //app.get('/equipmentCPRandFirstAid', equipmentCPRandFirstAidController.showeEquipmentCPRandFirstAid);

  //online course routes
  app.get('/onlineCourse', onlineCourseController.showOnlineCourse);

  //about routes
  app.get('/about', aboutController.showAbout);

  //courses routes
  //app.get('/courses', coursesController.showCourses);

  //4 hour courses routes
  app.get('/4hCourse', fHCourseController.show4hCourse);

  //8 hour courses routes
  app.get('/8hCourse', eHCourseController.show8hCourse);

  //22 hour courses routes
  app.get('/22hCourse', ttHCourseController.show22hCourse);

  //44 hour courses routes
  app.get('/44hCourse', ffHCourseController.show44hCourse);

  //60 hour courses routes
  app.get('/60hCourse', sHCourseController.show60hCourse);

  //4 hour baby courses routes
  app.get('/4hBabyCourse', fHBabyCourseController.show4hBabyCourse);

  //medical teams courses routes
  app.get('/medicalTeamsCourse', medicalTeamsCourseController.showMedicalTeamsCourse);

  //paramedic courses routes
  app.get('/paramedicCourse', paramedicCourseController.showParamedicCourse);

  //approvals routes
  app.get('/approvals', approvalsController.showApprovals);

  //recommendation routes
  app.get('/recommendation', recommendationController.showRecommendation);

  //cart routes
  app.get('/cart', cartController.showProducts);

  //seed products
  app.get('/cart/seed', cartController.seedProducts);

  //create product
  app.get('/cart/create', cartController.showCreate);
  app.post('/cart/create', cartController.processCreate);

  //edit product
  app.get('/cart/:slug/edit', cartController.showEdit);
  app.post('/cart/:slug', cartController.processEdit);

  //delete product
  app.get('/cart/:slug/delete', cartController.deleteProduct);

  //show a single product
  app.get('/cart/:slug', cartController.showSingle);

//====================================================================================

//admin routes
// main routes
//app.get('/main_admin', mainadminController.showPage);

//add product 
app.get('/admin_addProduct',  mainadminController.addProduct);
     
     
//     app.get('/profile', isLoggedIn, function(req, res) {
//        res.render('pages/profile.ejs', {layout:'admin_side/admin' , user : req.user });
//    });

//delete product 
app.get('/admin_deleteProduct',isLoggedIn, mainadminController.deleteProduct);

//update product 
app.get('/admin_updateProductDetails',isLoggedIn, mainadminController.updateProductDetails);

//delete product 
app.get('/admin_userlist',isLoggedIn, mainadminController.userlist);

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

//     return next();
    res.redirect('/');
}