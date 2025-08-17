import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

interface OGData {
  title: string;
  desc: string;
  url: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  constructor(private title: Title, private meta: Meta) {}

  updateTags(data: OGData) {
    this.updateTitle(data.title);
    this.updateDescription(data.desc);
    this.updateOgUrl(data.url);
    this.updateOgImage(data.image);
  }

  updateTitle(title: string) {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'og:title', content: title });
    this.meta.updateTag({ name: 'twitter:title', content: title });
  }

  updateOgUrl(url: string) {
    this.meta.updateTag({ name: 'og:url', content: url });
    this.meta.updateTag({ name: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:url', content: url });
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ name: 'og:description', content: desc });
    this.meta.updateTag({ name: 'twitter:description', content: desc });
  }

  updateOgImage(image: string) {
    this.meta.updateTag({ name: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
  }
}
