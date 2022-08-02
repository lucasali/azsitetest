(function() {


    'use strict';


    if(window.azcareers) {
        var errorMessage = '[!] window.azcareers it is already loaded.';
        var error = new Error(errorMessage);

        console.error(error);
        return;
    }


    ///////////////////
    // Careers Class //
    ///////////////////


    function Careers(data) {
        if(!data) {
            data = {};
        }

        var HELPER = {};
        var PRIVATE = {
            pull: {},
            push: {}
        };
        var PUBLIC = this;
        var CONFIG = {
            schema: 'https',
            host: 'www.azion.com',
            path: {
                push: '/api/careers/post',
                pull: '/api/careers/get'
            }
        }

        CONFIG.postURL = CONFIG.schema + '://' + CONFIG.host + CONFIG.path.push;
        CONFIG.getURL = CONFIG.schema + '://' + CONFIG.host + CONFIG.path.pull;


        //////////////////////
        // PRIVATE METHODS //
        ////////////////////


        PRIVATE.pull.categories = function() {
			var url = CONFIG.getURL + '/categories';
            url = encodeURI(url);

			return fetch(url).then(function(response) {
				if(!response.ok) {
					throw new Error({
						status: response.status,
						msg: '[!] Fetch ERROR to API communication'
					})
				}

				return response.json(function(data) {
					return data;
				});
			}).catch(function(error) {
				console.log(error);
				throw new Error(error);
			});
        };


        PRIVATE.pull.jobs = function(querie) {
			var url = CONFIG.getURL + '/jobs/' + (String(querie) || '');
            url = encodeURI(url);

            return fetch(url).then(function(response) {
				if(!response.ok) {
					throw new Error({
						status: response.status,
						msg: '[!] Fetch ERROR to API communication'
					})
				}

				return response.json(function(data) {
					return data;
				});
			}).catch(function(error) {
				console.error(error);
				throw new Error(error);
			});
        };


        PRIVATE.pull.job = function(jobID) {
			var url = CONFIG.getURL + '/job/' + (String(jobID) || '');
            url = encodeURI(url);

            return fetch(url).then(function(response) {
				if(!response.ok) {
					throw new Error({
						status: response.status,
						msg: '[!] Fetch ERROR to API communication'
					})
				}

				return response.json(function(data) {
					return data;
				});
			}).catch(function(error) {
				console.error(error);
				throw new Error(error);
			});
        };


		PRIVATE.push.applicants = function(applicant) {
			if(!applicant) {
				applicant = {};
			}

            var requestCONFIG = {
                method: 'POST',
                body: JSON.stringify(applicant),
            };
            var url = CONFIG.postURL + '/applicants';

            return fetch(url, requestCONFIG).then(function(response) {
				if(!response.ok) {
					throw new Error({
						status: response.status,
						msg: '[!] Fetch ERRROR to API communication'
					})
				}

				return response.json(function(data) {
					return data;
				});
			}).catch(function(error) {
				console.error(error);
				throw new Error(error);
			});
		};


        /////////////////////
        // PUBLIC METHODS //
        ///////////////////


		PUBLIC.pull = {
			categories: PRIVATE.pull.categories,
			jobs:  PRIVATE.pull.jobs,
			job:  PRIVATE.pull.job
		};


		PUBLIC.push = {
			applicants: PRIVATE.push.applicants
		};


        /////////////////////////
        // RETURNING INSTANCE //
        ////////////////////////


        return PUBLIC;
    }


	try {
    	window.azcareers = new Careers({});
	} catch(error) {
		console.error( new Error(error) );
	}


})();
