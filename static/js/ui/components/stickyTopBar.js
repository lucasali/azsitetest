class stickyTopBar {
    constructor(settings) {
        this.element = document.getElementById(settings.element);
        this.closeBtn = document.getElementById(settings.closeBtn)
        this.timeout = false;
        this.scrollPosition = 0;
        this.scrollDirection = null;
        this.position = null;
        this.stickyElementParentOffest = settings.stickyElementParentOffest;
        this.sessionStorage = sessionStorage.getItem("topBarHasBeenClosed")
        if(!this.sessionStorage){
            this.init(this);
        } else{
            return
        }
    }

    init(self) {
        if(!self.element && !self.closeBtn) return;

        self.element.style.display = 'block';
        self.closeBtn.addEventListener('click', () => this.close());
        window.addEventListener('scroll', () => this.handleScreenPositionForStickyElement(self));
    }

    close() {
        let header = document.getElementById('azheader');

        sessionStorage.setItem("topBarHasBeenClosed", "true");

        if (header) {
            header.style.top = '0px'
        }

        this.element.style.top = '-100px';

        setTimeout(() => {
            this.element.parentNode.removeChild(topBar);
        }, 200);
    }

    handleScreenPositionForStickyElement(self) {
        if (self.timeout) return;
        self.timeout = true;
        setTimeout(function () {
            self.scrollDirection = (document.body.getBoundingClientRect()).top > self.scrollPosition ? 'up' : 'down';
            self.scrollPosition = (document.body.getBoundingClientRect()).top;
            if (self.scrollDirection === 'down' && self.position !== 'down') {
                self.position = 'down';
                self.element.style.top = '-100px';
            } else if (self.scrollDirection === 'up' && self.position !== 'up') {
                self.position = 'up';
                self.element.style.top = 0;
            }
            self.timeout = false;
        }, 200);
    }
}

try{
    new stickyTopBar({
        element: 'topBar',
        closeBtn: 'closeTopBar',
        stickyElementParentOffest: '-100px'
    });
} catch(err) {
    console.error(err);
}
