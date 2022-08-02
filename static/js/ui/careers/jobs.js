(function() {
    'use strict';

    if(!window.azliquidjs) {
        console.error('[!] window.azliquidjs not loaded. It is a dependencie');
        return;
    }

    // THIS ENDPOINTS SHOULD BE USED TO KNOW THE NUMBERS OF JOBS by category
    var jobslenbytype = {
        'all': `https://www.azion.com/api/careers/get/jobslen`,
        'Revenue': `https://www.azion.com/api/careers/get/jobslen/department/Revenue`,
        'Operations': `https://www.azion.com/api/careers/get/jobslen/department/Operations`,
        'Engineering': `https://www.azion.com/api/careers/get/jobslen/department/Engineering`,
        'Security': `https://www.azion.com/api/careers/get/jobslen/department/Security`,
        'Products': `https://www.azion.com/api/careers/get/jobslen/department/Products`
    };


    ////////////////
    //   INIT    //
    ///////////////


})();
