class ScrollSpy {
    constructor(settings) {
        this.spySections = document.querySelectorAll(settings.spySections);
        this.spyOptions = settings.spyOptions;
        this.stopWorkingBiggerThan = settings.stopWorkingBiggerThan;
        this.observeUI(this);
    }
    observeUI(self) {
        function handleObserve(entry, obs) {
            if (window.innerWidth <= self.stopWorkingBiggerThan) return;
            if (entry[0].isIntersecting && window.innerWidth >= 960) {
                const sectionId = entry[0].target.id;
                self.handleUI(sectionId);
            }
        }

        const spy = new IntersectionObserver(handleObserve, self.spyOptions)

        this.spySections.forEach(spySection => {
            spy.observe(spySection);
        })
    }

    handleUI(sectionId) {
        let stickySidebar = document.querySelector('.sticky-sidebar');
        let activeItem = stickySidebar.querySelector('.active');
        let a = document.querySelector('a[href*=' + sectionId + ']');

        if(activeItem) {
            activeItem.classList.remove('active');
        } else {
            console.log('[!] activeItem element not found.');
        }

        if(a) a.classList.add('active');
    }
}
