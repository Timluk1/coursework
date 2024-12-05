export class ScrollManager {
    static scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}