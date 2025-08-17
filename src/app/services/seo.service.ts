import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

interface OGData {
  title: string;
  desc: string;
  url: string;
  image: string;
  domain?: string;
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
    if (data.domain) this.updateDomain(data.domain);
  }

  updateTitle(title: string) {
    this.title.setTitle(title);
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ name: 'twitter:title', content: title });
  }

  updateOgUrl(url: string) {
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:url', content: url });
  }

  updateDomain(domain: string) {
    this.meta.updateTag({ property: 'twitter:domain', content: domain });
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ name: 'twitter:description', content: desc });
  }

  updateOgImage(image: string) {
    this.meta.updateTag({ property: 'og:image', itemprop: 'image', content: image });
    this.meta.updateTag({ property: 'og:image:secure_url', itemprop: 'image', content: image });
    this.meta.updateTag({ property: 'og:image:width', content: '1536' });
    this.meta.updateTag({ property: 'og:image:height', content: '1024' });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
  }
}
