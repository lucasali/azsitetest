class DropdownToggle {
    constructor(settings) {
        this.links = document.querySelectorAll(settings.dropdownLinks);
        this.dropdowns = document.querySelectorAll(settings.dropdownAreas);
        this.currentOpened = undefined;
        this.init();
    }

    init() {
        this.links.forEach((el) =>
            el.addEventListener("click", (e) => {
                this.activate(e);
            })
        );
    }

    activate(evt) {
        let selectedPanel = evt.currentTarget;
        if (this.currentOpened === selectedPanel) {
            this.closeCurrent();
        } else {
            this.closeAll();
            this.openSelected(selectedPanel);
        }
    }

    closeAll() {
        this.links.forEach((el) => {
            if (el.classList.contains("active")) {
                el.classList.remove("active");
                el.nextElementSibling.classList.remove("active");
                el.nextElementSibling.style.removeProperty("max-height");
            }
        });
    }

    closeCurrent() {
        this.currentOpened.classList.remove("active");
        this.currentOpened.nextElementSibling.classList.remove("active");
        this.currentOpened.nextElementSibling.style.removeProperty(
            "max-height"
        );
        this.currentOpened = undefined;
    }

    openSelected(selectedPanel) {
        selectedPanel.classList.add("active");
        selectedPanel.nextElementSibling.classList.add("active");
        selectedPanel.nextElementSibling.style.maxHeight = `${selectedPanel.nextElementSibling.scrollHeight}px`;
        this.currentOpened = selectedPanel;
    }
}
