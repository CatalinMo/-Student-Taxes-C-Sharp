import { Vue } from 'vue-class-component';

export default class ScrollToTopComponent extends Vue {
  windowScrolled = false;

  created() {
    window.addEventListener('scroll', this.onWindowScroll);
  }

  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll);
  }
}
