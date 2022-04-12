export const generateManifest = async (options) => {
  const config = await import('/config');

  const { icons, ...rest } = options;
  const { APP_LOCATION: appLocation } = process.env;
  const { name } = config;

  const manifestMimeType = 'application/manifest+json';
  const manifestFilename = 'manifest.webmanifest';

  const defaultManifest = {
    name,
    short_name: name,
    description: 'Підтримайте Україну за допомогою свого девайсу',
    id: '/',
    start_url: appLocation,
    scope: appLocation,
    display: 'standalone',
    lang: 'uk-UA',
    background_color: '#e6e6fa',
    theme_color: '#e6e6fa',
    categories: ['utilities', 'social'],
    orientation: 'portrait-secondary',
    icons: [
      {
        src: new URL(
          '../../assets/images/favicons/favicon.svg',
          import.meta.url
        ),
        sizes: '16x16 32x32',
        type: 'image/svg+xml',
      },
      {
        src: new URL(
          '../../assets/images/favicons/favicon_x48.png',
          import.meta.url
        ),
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: new URL(
          '../../assets/images/favicons/favicon_x72.png',
          import.meta.url
        ),
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: new URL(
          '../../assets/images/favicons/apple-touch-icon_x80.png',
          import.meta.url
        ),
        sizes: '80x80',
        type: 'image/png',
      },
      {
        src: new URL(
          '../../assets/images/favicons/favicon_x96.png',
          import.meta.url
        ),
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: new URL(
          '../../assets/images/favicons/favicon_x128.png',
          import.meta.url
        ),
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: new URL(
          '../../assets/images/favicons/favicon_x180.png',
          import.meta.url
        ),
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: new URL(
          '../../assets/images/favicons/favicon_x256.png',
          import.meta.url
        ),
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: new URL(
          '../../assets/images/favicons/favicon-splash_x512.png',
          import.meta.url
        ),
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: new URL(
          '../../assets/images/favicons/maskable_icon_x1024.png',
          import.meta.url
        ),
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };

  const manifest = {
    ...defaultManifest,
    ...rest,
  };

  const manifestContent = JSON.stringify(manifest);
  const manifestBlob = new File([manifestContent], manifestFilename, {
    type: manifestMimeType,
  });
  const manifestURL = URL.createObjectURL(manifestBlob);

  const manifestElement = document.getElementById('manifest');

  manifestElement.href = manifestURL;

  return manifestURL;
};
