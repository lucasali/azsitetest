class DropdownSticky {
    constructor(settings) {
        this.links = document.querySelectorAll(settings.dropdownLinks);
        this.dropdowns = document.querySelectorAll(settings.dropdownAreas);
        this.stickyChildLinks = document.querySelectorAll(settings.stickyChildLinks);
        this.timeout = false;
        this.scrollPosition = 0;
        this.scrollDirection = null;
        this.currentTarget = null;
        this.currentTargetNextSibling = null;
        this.position = null;
        this.isActive = false;
        this.stickyElementParentOffest = settings.stickyElementParentOffest;
        this.init(this);
    }
    init(self) {

        self.links.forEach(el =>
            el.addEventListener('click', (e) => {
                self.currentTarget = e.currentTarget;
                self.currentTargetNextSibling = e.currentTarget.nextElementSibling;
                !self.isActive ? this.handleActivate() : this.handleDisable();
            })
        );

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 960 && this.isActive) {
                this.handleDisable();
            }
        })

        window.addEventListener('scroll', () => {
            if (self.links.length > 1) {
                console.warn(`Sticky dropdown must be used only in single elements.
                    You are probably selecting a nodelist with more than one element`);
                return;
            }
            // will make sure to keep the sticky element behind the sticky header
            if (window.innerWidth <= 960) {
                this.handleScreenPositionForStickyElement(self);
            }
        });

        this.stickyChildLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const target = e.target.hash.replace('#','');
                const elementToScroll = document.getElementById(target);
                elementToScroll.scrollIntoView({ behavior: 'smooth' });
                this.handleDisable();
            })
        })

    }

    handleActivate() {
        if (this.isActive) return;
        document.body.style.overflow = 'hidden';
        this.currentTarget.classList.add("active");
        this.currentTarget.parentElement.style.position = 'fixed';
        this.currentTargetNextSibling.classList.add("active");
        this.currentTargetNextSibling.style.maxHeight = `${(window.innerHeight)}px`;
        this.isActive = true;
    }

    handleDisable() {
        if (!this.isActive) return;
        document.body.style.overflow = 'auto';
        this.currentTarget.classList.remove("active");
        this.currentTarget.nextElementSibling.classList.remove("active");
        this.currentTarget.nextElementSibling.style.removeProperty('max-height');
        this.currentTarget.parentElement.style.position = 'sticky';
        this.isActive = false;
    }

    handleScreenPositionForStickyElement(self) {
        if (self.timeout) return;
        self.timeout = true;
        setTimeout(function () {
            self.scrollDirection = (document.body.getBoundingClientRect()).top > self.scrollPosition ? 'up' : 'down';
            self.scrollPosition = (document.body.getBoundingClientRect()).top;
            if (self.scrollDirection === 'down' && self.position !== 'down') {
                self.position = 'down';
                self.links[0].parentElement.style.top = '0px';
            } else if (self.scrollDirection === 'up' && self.position !== 'up') {
                let topBar = document.getElementById('topBar');
                self.position = 'up';
                if(topBar) {
                    self.links[0].parentElement.style.top = `${self.stickyElementParentOffest + topBar.offsetHeight}px`;
                } else{
                    self.links[0].parentElement.style.top = self.stickyElementParentOffest;
                }
            }
            self.timeout = false;
        }, 200);
    }
}
