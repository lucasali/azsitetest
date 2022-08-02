(function() {
    'use strict';

    var urlSearchParams = new URLSearchParams(window.location.search);
    var params = {
        id: urlSearchParams.get('id')
    };

    if(!params.id) {
        console.warn('[!] Page has not the job id');
        return;
    }

    var careersJobView = document.querySelector('#careersJobView');
    var formElement = careersJobView.querySelector('form[name="applicantForm"]');
    var jobidHiddeInput =  formElement.querySelector('input[name="job"]');
    var boxResumeElement = formElement.querySelectorAll('.box-resume')[0];
    var boxBtnElement = formElement.querySelectorAll('.box-btn')[0];
    var isBoxBtnElementClicked = false;
    var inputFile = formElement.querySelectorAll('input[name="base64-resume"]')[0];
    var textarea = formElement.querySelectorAll('textarea[name="resumetext"]')[0];
    var shareButtons = document.querySelectorAll('#share a');

    if(!careersJobView) {
        console.warn('[!] Not found careersJobView element: ', careersJobView)
        return;
    }

    if(!boxBtnElement) {
        console.warn('[!] Not found boxBtnElement element: ', boxBtnElement)
        return;
    }

    if(jobidHiddeInput) {
        jobidHiddeInput.setAttribute('value', params.id);
    }

    if(shareButtons){
        shareButtons.forEach(shareLink => {
            shareLink.setAttribute('href', `${shareLink.href}?id=${params.id}` )
        })
    }

    var coverElement = careersJobView.querySelector('#cover');
    var mCoverIconList = careersJobView.querySelector('#mCoverIconList');
    var breadcrumbJobTitle = careersJobView.querySelector('#breadcrumbJobTitle');
    var jobDescription = careersJobView.querySelector('#jobDescription');


    ///////////////
    // FUNCTIONS //
    ///////////////


    function inputFileIsValidExtension() {
        return ['pdf', 'doc', 'docx', 'odt', 'txt', 'rtf'].indexOf(getFileExtension()) > -1;
    }


    function getFileExtension() {
        var inputfile = careersJobView.querySelectorAll('input[name="base64-resume"]')[0];
        return inputfile.files.length ? inputfile.files[0].name.split('.').pop().toLowerCase() : ''; //file extension from input file
    }


    function getBase64() {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            var inputfile = careersJobView.querySelectorAll('input[name="base64-resume"]')[0];

            reader.onloadend = function () {
                var resultbase64 = reader.result.split(',');
                var value = resultbase64.length === 2 ? resultbase64[1] : '';

                resolve( value );
            };

            reader.onerror = function (error) {
                reject(error);
            };

            if(inputfile.files['0']) {
                reader.readAsDataURL( inputfile.files['0'] );
            }
        });
    }


    function formValidate(form) {
        return new Promise(function(resolve, reject) {
            var formData = new FormData(form);

            for(var pair of formData.entries()) {
                var key = pair[0];
                var value = pair[1];
                var input = form.querySelectorAll('input[name="' + key + '"]')[0];

                if(key !== 'base64-resume' && key !== 'resumetext') {
                    validate(input);
                }
            }

            resolve();
        });
    }


    function validate(input, isupload) {
        if(!input) {
            return false;
        }

        var validityState_object = input.validity;
        var spanerror = document.createElement('span');
        var inputParentElement = input.parentElement;
        var msgError = inputParentElement.querySelectorAll('span.error')[0];
        var isFileInput = input.getAttribute('type') === 'file';

        input.classList.remove('error');
        spanerror.classList.add('error');

        if(msgError) {
            msgError.remove();
        }

        if(isupload) {
            spanerror.innerHTML = window.azsitelang === 'pt-br' ? 'Anexe currículo.' : 'Please attach résumé.';
            inputParentElement.appendChild(spanerror);
            return false;
        }

        if(isFileInput && !inputFileIsValidExtension()) {
            spanerror.innerHTML = window.azsitelang === 'pt-br' ? 'Faça upload de uma extensão de arquivo válida.' : 'Please upload a valid file extension.';
            inputParentElement.appendChild(spanerror);
            return false;
        }

        if (validityState_object.valueMissing) {
            input.classList.add('error');
            spanerror.innerHTML = window.azsitelang === 'pt-br' ? 'Preencha este campo obrigatório.' :  'Please complete this required field.';
            inputParentElement.appendChild(spanerror);
            return false;
        } else if (validityState_object.rangeUnderflow) {
            input.classList.add('error');
            spanerror.innerHTML = window.azsitelang === 'pt-br' ? 'Precisamos de um número maior.' : 'We need a higher number.';
            inputParentElement.appendChild(spanerror);
            return false;
        } else if (validityState_object.rangeOverflow) {
            input.classList.add('error');
            spanerror.innerHTML = window.azsitelang === 'pt-br' ? 'Isso é muito alto.' : 'Thats too high.';
            inputParentElement.appendChild(spanerror);
            return false;
        } else if(validityState_object.typeMismatch) {
            input.classList.add('error');
            spanerror.innerHTML = window.azsitelang === 'pt-br' ? 'Digite um valor válido.' : 'Please enter valid value.';
            inputParentElement.appendChild(spanerror);
            return false;
        } else {
            input.setCustomValidity('');
            input.reportValidity();
            return true;
        }
    }


    function bindFormEvent(form) {
        var formData = new FormData(form);

        for(var pair of formData.entries()) {
            var key = pair[0];
            var value = pair[1];
            var elementToBind;

            if(key === 'base64-resume' || key === 'resumetext') {
                continue;
            }

            elementToBind = form.querySelectorAll('input[name="' + key + '"]')[0];

            elementToBind.addEventListener('blur', function(e) {
                var target = e.target;
                validate(target);
            });
        }
    }


    function anchorPosFormSubmit() {
        var applyContent = careersJobView.querySelectorAll('.job-to-apply-content')[0];
        var applyContentOffsetTop = applyContent ? applyContent.offsetTop : 0;
        var header = document.querySelectorAll('.site-header')[0];
        var headerOffsetHeight = header ? header.offsetHeight : 0;
        var scrollto = applyContentOffsetTop + headerOffsetHeight;
        var scrolltoType = typeof scrollto;

        if(typeof scrollto !== 'number') {
            console.warn('[!] Submit scrollto value, ', scrollto);
            console.warn('[!] Submit scrollto typeof, ', typeof scrollto);
            return;
        }

        window.scrollTo(0, scrollto);
    }


    ////////////////
    // BIND EVENT //
    ////////////////


    var btn = formElement.querySelectorAll('button[type="submit"]')[0];
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        formValidate(formElement).then(function() {
            var data = {};
            var formData = new FormData(formElement);
            var inputFile = formElement.querySelectorAll('input[name="base64-resume"]')[0];
            var isValid = false;

            if(inputFile.files.length > 0) {
                getBase64().then(function(resultbase64) {
                    data['base64-resume'] = resultbase64;

                    for(var pair of formData.entries()) {
                        var key = pair[0];
                        var value = pair[1];

                        if(key !== 'base64-resume' && key !== 'resumetext') {
                            data[key] = value;
                        }
                    }

                    if(validate(inputFile)) {
                        window.azcareers.push.applicants(data).then(function(response) {
                            window.azliquidjs.render(
                                formElement,
                                'careers/success',
                                {
                                    lang: azsitelang
                                }
                            );

                            anchorPosFormSubmit();
                        }).catch(function(error) {
                            console.log('Error: ', error);
                            window.azliquidjs.renderAppend(
                                formElement,
                                'careers/error',
                                {
                                    lang: azsitelang,
                                    error: error.error
                                }
                            ).catch(function(err) {
                                console.error('[!] careers/filter-jobs error rendered: ', err);
                            });
                        });
                    }
                }).catch(function(error) {
                    console.log('Error: ', error);

                    window.azliquidjs.renderAppend(
                        formElement,
                        'careers/error',
                        {
                            lang: azsitelang,
                            error: error.error
                        }
                    ).catch(function(err) {
                        console.error('[!] careers/filter-jobs error rendered: ', err);
                    });
                });
            } else {
                isValid = validate(inputFile, true);
            }
        });

    });


    ///////////////
    // INIT PAGE //
    ///////////////


    window.azcareers.pull.job(params.id).then(function(job) {
        bindFormEvent(formElement);

        if(breadcrumbJobTitle && jobDescription) {
            breadcrumbJobTitle.innerHTML = job.title;
            jobDescription.innerHTML = job.description;

            // removing all the style inline configured on Jazz text
            // Inline
            var postTextContentChildList = document.querySelectorAll('.post-text-content *');
            postTextContentChildList.forEach(function(element) {
                element.removeAttribute('style');
            });
        }

        if(coverElement && mCoverIconList) {
            window.azliquidjs.render(mCoverIconList, 'careers/job-cover-list-icon', job).catch(function(error) {
                console.error('[!] careers/job-cover-list-icon error rendered: ', error);
            });

            window.azliquidjs.render(coverElement, 'careers/job-cover', job).catch(function(error) {
                console.error('[!] careers/job-cover error rendered: ', error);
            });
        }
    }).catch(function(error) {
        console.error('[!] ERROR searching the job from id :: ', params.id);
        console.error(error);

        window.azliquidjs.renderAppend(
            jobDescription,
            'careers/error',
            {
                error: error.error
            }
        ).catch(function(error) {
            console.error('[!] careers/filter-jobs error rendered: ', error);
        });
    });


})();
