/**
 * HoursController
 *
 * @description :: Server-side logic for managing hours
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    checkHours: function(req, res) {
        if (req.body.quit) {
            Hours.update( { id: req.body.quit }, { end: new Date() }, function(err,updated){
                if(err) {
                    return err;
                }
                console.log('Tracking Fini : ID '+req.body.quit+' updated');
                return res.redirect('/');
            });
        } else if (req.body.start === '') {
            Hours.create( { start: new Date(), user: 4 }, function(err,created){
                if(err) {
                    return err;
                }
                console.log('Track en cours : Start : '+created.start);
                return res.redirect('/');
            });
        }
    },

	getAllHours: function(req, res) {
        var moment = require('moment');
        var duration = require('moment-duration-format');
    	Hours.find({ end : {'!': null} }, function(err, found){
        	res.view( 'all', {hours: found, moment: moment, duration: duration} );
    	});
    },

    getMonthHours: function(req, res) {
        var moment = require('moment');
        var duration = require('moment-duration-format');
    	Hours.find({ end : {'!': null} }, function(err, found){
        	res.view( 'stats', {id: req.param('id'), hours: found, moment: moment, duration: duration} );
    	});
    },

    getTrack: function(req, res) {
        var moment = require('moment');
        var duration = require('moment-duration-format');
    	Hours.find({}, function(err, found){
            if (found[found.length - 1].end === null) {
                var pending = found[found.length - 1].id;
                var starting = found[found.length - 1].start;
                found.pop();
                res.view( 'homepage', {id: pending, date: starting, hours: found, moment: moment, duration: duration} );
            } else {
                res.view( 'homepage', {id: undefined, hours: found, moment: moment, duration: duration} );
            }
    	});
    },

    deleteHours: function(req, res) {
        console.log(req.param('id'));
        Hours.destroy({ id: req.param('id') }).exec(function (err) {
            if (err) {
                return err;
            }
            console.log('Hours id '+ req.param('id') +' deleted !');
            return res.redirect('/stats');
        });
    }

};

